import { writeFile, access } from 'fs/promises';
import { Job, DB_PATH_BASE, MAX_ENTRIES_PER_QUERY } from '../main.js';
import { SearchOptions } from './index.js';
import getParsedHTML from '../utils/getParsedHTML.js';
import getPriorityPoints from '../utils/getPriorityPoints.js';
import { jobIsDesired } from '../utils/jobIsDesired.js';

const linkedIn = {
  url: {
    searchBase: 'https://www.linkedin.com/jobs/search/?',
    jobPageBase: 'https://www.linkedin.com/jobs/view/',
    timeRange: {
      'by day': 'f_TPR=r86400',
      'by week': 'f_TPR=r604800',
    },
    keywords: 'keywords=',
    location: 'location=',
    pagination: 'start=',
  },
  maxEntriesPerPage: 25,
};

async function addLinkedInJobs(searchOptions: SearchOptions): Promise<void> {
  const { listOfSearchKeywords } = searchOptions;
  const jobs = new Map<string, number[]>();
  let totalAdded = 0;

  // qeury each set of keywords
  for (let keywords of listOfSearchKeywords) {
    let start = 0,
      totalEntries = 0;
    let count = 0;
    let lastAddedAt = 0;
    // paginations
    do {
      const url = getFullQueryUrl(searchOptions, keywords, start);
      const $ = await getParsedHTML(url);
      if ($ instanceof Error) {
        console.log(
          `${keywords}: Error fetching jobs from ${start}, next start`
        );
        continue;
      }
      if (!totalEntries)
        totalEntries = +$('.results-context-header__job-count')
          .text()
          .replace(/[\,\+]/g, '');

      const jobCards = $('.jobs-search__results-list .base-card');
      // process all jobs from start, total numbers: linkedIn.maxEntriesPerPage
      for (const jobCard of jobCards) {
        count++;
        const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
        if (!jobId) continue;

        const { title, company, location } = getJobInfo($, jobCard);
        console.log(
          `${keywords}: at ${count} job / ${totalEntries} of title ${title}`
        );
        if (jobs.has(jobId)) {
          console.log(
            `Job (${title}) visited at [start, count]: ${jobs.get(jobId)}`,

            `Last add at ${lastAddedAt}`
          );
          if (count - lastAddedAt > 500) {
            console.log(`Long time no add...`);
            return;
          }
          continue;
        }
        jobs.set(jobId, [start, count]);

        const isDesired = jobIsDesired(title);
        if (!isDesired) {
          console.log(`Skip job of undesired title ${title}`);
          continue;
        }

        const href = `${linkedIn.url.jobPageBase}${jobId}`;
        const description = await getJobDescription(href);
        if (description instanceof Error) {
          console.log(`Error fetching description for job ${jobId}, next job`);
          continue;
        }

        const { priority, priorityHits } = getPriorityPoints(description);

        const job: Job = {
          id: jobId,
          title,
          company,
          href,
          location,
          description,
          priority,
          priorityHits,
        };

        const fileName = `linkedIn-${jobId}-${title
          .replace(/[^\w\d\s]/g, ' ')
          .split(' ')
          .filter((w) => w)
          .join('_')}.json`;

        try {
          await access(DB_PATH_BASE + '/' + fileName);
          console.log('File exists');
        } catch (e: any) {
          try {
            await writeFile(DB_PATH_BASE + '/' + fileName, JSON.stringify(job));
            console.log(`Added ${fileName} to db`);
            lastAddedAt = count;
            totalAdded += 1;
          } catch (err) {
            console.log(err);
          }
        }
      }
      start += linkedIn.maxEntriesPerPage;
      console.log(
        start,
        'boundary:',
        getBoundary(MAX_ENTRIES_PER_QUERY, totalEntries)
      );
    } while (start < getBoundary(MAX_ENTRIES_PER_QUERY, totalEntries));
  }
  console.log('Query completed, added', totalAdded);
}

function getFullQueryUrl(
  searchOptions: SearchOptions,
  keywords: string,
  start: number
) {
  const { timeRange, location } = searchOptions;
  //@ts-nocheck
  const url =
    linkedIn.url.searchBase +
    linkedIn.url.timeRange[timeRange] +
    '&' +
    linkedIn.url.keywords +
    keywords.split(' ').join('%20') +
    '&' +
    linkedIn.url.location +
    location.split(' ').join('%20') +
    '&' +
    linkedIn.url.pagination +
    start;
  return url;
}

function getJobInfo($: cheerio.Root, jobCard: cheerio.Element) {
  const linkElement = $(jobCard).find('.base-card__full-link')[0];
  // const href = $(linkElement).attr('href') as string;

  const cardInfo = $(jobCard).find('.base-search-card__info').eq(0);
  const title = $(cardInfo)
    .find('.base-search-card__title')
    .eq(0)
    .text()
    .trim();
  const company = $(cardInfo)
    .find('.base-search-card__subtitle a')
    .eq(0)
    .text()
    .trim();
  const location = $(cardInfo)
    .find('.job-search-card__location')
    .eq(0)
    .text()
    .trim();

  return { title, company, location };
}

async function getJobDescription(url: string): Promise<string | Error> {
  const $ = await getParsedHTML(url);
  if ($ instanceof Error) {
    return $;
  }
  const jd = $('.show-more-less-html__markup');
  return $(jd).html() || '';
}

function getBoundary(maxEntriesPerQuery: number, totalEntries: number): number {
  return maxEntriesPerQuery
    ? Math.min(maxEntriesPerQuery, totalEntries)
    : totalEntries;
}

export default addLinkedInJobs;
