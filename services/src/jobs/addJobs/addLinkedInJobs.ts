import { Config, TimeRange, Job } from '../../types.js';
import { writeFile, access, mkdir } from 'fs/promises';
import getParsedHTML from '../utils/getParsedHTML.js';
import getPriorityPoints from '../utils/getPriorityPoints.js';
import { jobIsDesired } from '../utils/jobIsDesired.js';
import { DB_PATH_BASE, MAX_ENTRIES_PER_QUERY } from '../../env.js';
import userExists from '../../users/userExists.js';

let shouldTerminate = false;
let isRunning = false;

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

async function addLinkedInJobs(config: Config): Promise<void> {
  const {
    listOfSearchKeywords,
    timeRange,
    location,
    priorityList,
    titleExcludes,
    titleIncludes,
  } = config.body;

  isRunning = true;
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
      const url = getFullQueryUrl(timeRange, location, keywords, start);
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
        if (shouldTerminate) {
          shouldTerminate = false;
          isRunning = false;
          console.log('Running scraper terminated');
          return;
        }
        count++;
        const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
        if (!jobId) continue;

        const { title, company, location } = getJobInfo($, jobCard);
        // console.log(
        //   `${keywords}: at ${count} job / ${totalEntries} of title ${title}`
        // );
        if (jobs.has(jobId)) {
          // console.log(
          //   `Job (${title}) visited at [start, count]: ${jobs.get(jobId)}`,

          //   `Last add at ${lastAddedAt}`
          // );
          if (count - lastAddedAt > 500) {
            console.log(`Long time no add..., break. Added`, totalAdded);
            isRunning = false;
            return;
          }
          continue;
        }
        jobs.set(jobId, [start, count]);

        const isDesired = jobIsDesired(titleIncludes, titleExcludes, title);
        if (!isDesired) {
          //console.log(`Skip job of undesired title ${title}`);
          continue;
        }

        const href = `${linkedIn.url.jobPageBase}${jobId}`;
        const description = await getJobDescription(href);
        if (description instanceof Error) {
          console.log(`Error fetching description for job ${jobId}, next job`);
          continue;
        }

        const { priorityPoints, priorityHits } = getPriorityPoints(
          priorityList,
          description
        );

        const job: Job = {
          id: jobId,
          userId: config.userId,
          source: 'linkedin',
          body: {
            title,
            company,
            href,
            location,
            description,
            priorityPoints,
            priorityHits,
          },
        };

        const fileName = `linkedIn-${jobId}-${title
          .replace(/[^\w\d\s]/g, ' ')
          .split(' ')
          .filter((w) => w)
          .join('_')}.json`;

        const exists = await userExists(config.userId);
        const jobsDirName = `${DB_PATH_BASE}/${
          exists ? 'users' : 'anonymous'
        }/${config.userId}/jobs`;
        await mkdir(jobsDirName, { recursive: true });

        try {
          await access(jobsDirName + '/' + fileName);
          //console.log('File exists');
        } catch (e: any) {
          try {
            if (shouldTerminate) {
              shouldTerminate = false;
              isRunning = false;
              console.log('Running scraper terminated');
              return;
            }
            await writeFile(jobsDirName + '/' + fileName, JSON.stringify(job));
            //console.log(`Added ${fileName} to ${jobsDirName}`);
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
  isRunning = false;
}

function getFullQueryUrl(
  timeRange: TimeRange,
  location: string,
  keywords: string,
  start: number
) {
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

export const stopAdding = () => {
  shouldTerminate = true;
};

export const hasRunningInstance = () => {
  return isRunning;
};

export const stoppedAdding = () => {
  return new Promise((resolve, reject) => {
    const checkTermination = () => {
      if (!shouldTerminate) {
        resolve(true);
      } else {
        setTimeout(checkTermination, 100);
      }
    };

    checkTermination();
  });
};

export default addLinkedInJobs;
