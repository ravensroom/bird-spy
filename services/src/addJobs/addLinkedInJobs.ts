import { writeFile, access } from 'fs/promises';
import { Job, DB_PATH_BASE, MAX_ENTRIES_PER_QUERY } from '../main.js';
import { SearchOptions } from './index.js';
import getParsedHTML from '../utils/getParsedHTML.js';
import getPriorityPoints from '../utils/getPriorityPoints.js';
import { jobIsDesired } from '../utils/jobIsDesired.js';
import getBrowser from '../utils/getBrowser.js';
import { Page } from 'puppeteer';

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
      totalResults = 0;
    let count = 0;
    let lastAddedAt = 0;
    // paginations
    do {
      const browser = await getBrowser();
      if (browser instanceof Error) {
        console.log(
          `${keywords}: Error fetching jobs from ${start}, next start`
        );
        continue;
      }
      const url = getFullQueryUrl(searchOptions, keywords, start);
      const page = await browser.newPage();
      const { jobs, totalCount } = await getJobList(url, page);
      if (!totalResults) totalResults = totalCount;
      console.log(jobs, totalResults);
      await browser.close();
      return;
      // if (!totalResults)
      //   totalResults = +$('.results-context-header__job-count')
      //     .text()
      //     .replace(/[\,\+]/g, '');

      // const $ = await getParsedHTML(url);
      // if ($ instanceof Error) {
      //   console.log(
      //     `${keywords}: Error fetching jobs from ${start}, next start`
      //   );
      //   continue;
      // }
      // const jobCards = $('.jobs-search__results-list .base-card');
      // // process all jobs from start, total numbers: linkedIn.maxEntriesPerPage
      // for (const jobCard of jobCards) {
      //   count++;
      //   const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
      //   if (!jobId) continue;

      //   const { title, company, location } = getJobInfo($, jobCard);
      //   console.log(
      //     `${keywords}: at ${count} job / ${totalResults} of title ${title}`
      //   );
      //   if (jobs.has(jobId)) {
      //     console.log(
      //       `Job (${title}) visited at [start, count]: ${jobs.get(jobId)}`,

      //       `Last add at ${lastAddedAt}`
      //     );
      //     if (count - lastAddedAt > 500) {
      //       console.log(`Long time no add...`);
      //       return;
      //     }
      //     continue;
      //   }
      //   jobs.set(jobId, [start, count]);

      //   const isDesired = jobIsDesired(title);
      //   if (!isDesired) {
      //     console.log(`Skip job of undesired title ${title}`);
      //     continue;
      //   }

      //   const href = `${linkedIn.url.jobPageBase}${jobId}`;
      //   const description = await getJobDescription(href);
      //   if (description instanceof Error) {
      //     console.log(`Error fetching description for job ${jobId}, next job`);
      //     continue;
      //   }

      //   const priority = getPriorityPoints(description);

      //   const job: Job = {
      //     id: jobId,
      //     title,
      //     company,
      //     href,
      //     location,
      //     description,
      //     priority,
      //   };

      //   const fileName = `linkedIn-${jobId}-${title
      //     .replace(/[^\w\d\s]/g, ' ')
      //     .split(' ')
      //     .filter((w) => w)
      //     .join('_')}.json`;

      //   try {
      //     await access(DB_PATH_BASE + '/' + fileName);
      //     console.log('File exists');
      //   } catch (e: any) {
      //     try {
      //       await writeFile(DB_PATH_BASE + '/' + fileName, JSON.stringify(job));
      //       console.log(`Added ${fileName} to db`);
      //       lastAddedAt = count;
      //       totalAdded += 1;
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   }
      // }
      // start += linkedIn.maxEntriesPerPage;
      // console.log(
      //   start,
      //   'boundary:',
      //   getBoundary(MAX_ENTRIES_PER_QUERY, totalResults)
      // );
    } while (start < getBoundary(MAX_ENTRIES_PER_QUERY, totalResults));
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

function getBoundary(maxEntriesPerQuery: number, totalResults: number): number {
  return maxEntriesPerQuery
    ? Math.min(maxEntriesPerQuery, totalResults)
    : totalResults;
}

async function getJobList(url: string, page: Page) {
  // Navigate to the page with the job list
  await page.goto(url);

  // Wait for the job list to load
  await page.waitForSelector('.jobs-search-results__list-item');

  // Extract job information
  const jobs = await page.evaluate(() => {
    const jobList = Array.from(
      document.querySelectorAll('.jobs-search-results__list-item')
    );

    return jobList.map((jobItem) => {
      const titleElement = jobItem.querySelector('.job-card-list__title');
      const companyElement = jobItem.querySelector(
        '.job-card-container__primary-description'
      );
      const locationElement = jobItem.querySelector(
        '.job-card-container__metadata-item'
      );

      const title = titleElement?.textContent?.trim() || '';
      const company = companyElement?.textContent?.trim() || '';
      const location = locationElement?.textContent?.trim() || '';

      return { title, company, location };
    });
  });

  // extract totalResults
  const totalCount = await page.evaluate(() => {
    const totalResultsElement = document.querySelector(
      '.jobs-search-results-list__subtitle span'
    );
    const totalResultsText = totalResultsElement?.textContent?.trim() || '';
    const totalResultsMatch = totalResultsText.match(/\d+/);
    return totalResultsMatch ? parseInt(totalResultsMatch[0], 10) : 0;
  });

  return { jobs, totalCount };
}

export default addLinkedInJobs;
