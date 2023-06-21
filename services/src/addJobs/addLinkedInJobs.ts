import { writeFile } from 'fs/promises';
import { Job, DB_PATH_BASE } from '../main.js';
import { LinkedIn, SearchOptions, Rules } from './index.js';
import getParsedHTML from '../utils/getParsedHTML.js';
import getPriorityPoints from '../utils/getPriorityPoints.js';

async function addLinkedInJobs(
  linkedIn: LinkedIn,
  searchOptions: SearchOptions,
  rules: Rules
): Promise<void> {
  const { listOfSearchKeywords, maxEntriesPerQuery } = searchOptions;
  const { titleShouldExclude, titleShouldInclude } = rules;
  const jobs = new Set<string>();

  // qeury each set of keywords
  for (let keywords of listOfSearchKeywords) {
    let start = 0,
      totalEntries = 0;
    // paginations
    do {
      const $ = await getParsedHTML(
        getFullQueryUrl(linkedIn, searchOptions, keywords, start)
      );
      if ($ instanceof Error) {
        console.log($);
        return;
      }
      totalEntries = +$('.results-context-header__job-count')
        .text()
        .replace(/[\,\+]/g, '');

      const jobCards = $('.jobs-search__results-list .base-card');
      // process all jobs from start, total numbers: linkedIn.maxEntriesPerPage
      jobCards.each(async (index, jobCard) => {
        const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
        if (!jobId) return;
        if (jobs.has(jobId)) return;
        jobs.add(jobId);

        const { title, company, location } = getJobInfo($, jobCard);
        const href = `${linkedIn.url.jobPageBase}${jobId}`;

        const isDesired = jobIsDesired(
          title,
          titleShouldExclude,
          titleShouldInclude
        );

        if (!isDesired) return;

        const description = await getJobDescription(href);
        if (description instanceof Error) {
          console.log(description);
          return;
        }

        const priority = getPriorityPoints(description);

        const job: Job = {
          id: jobId,
          title,
          company,
          href,
          location,
          description,
          priority,
        };

        const fileName = `linkedIn-${jobId}-${title
          .replace(/[^\w\d\s]/g, ' ')
          .split(' ')
          .filter((w) => w)
          .join('_')}.json`;

        try {
          await writeFile(DB_PATH_BASE + '/' + fileName, JSON.stringify(job));
          console.log(`Added ${fileName} to db`);
        } catch (e: any) {
          throw new Error(e);
        }
      });

      start += linkedIn.maxEntriesPerPage;
    } while (start < getBoundary(maxEntriesPerQuery, totalEntries));
  }
}

function getFullQueryUrl(
  linkedIn: LinkedIn,
  searchOptions: SearchOptions,
  keywords: string,
  start: number
) {
  const { timeRange, location } = searchOptions;
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

function jobIsDesired(
  title: string,
  titleShouldExclude: Set<string>,
  titleShouldInclude: Set<string>
): boolean {
  const titleWords = title.split(/[\s(),.;\-|\/]+/);
  let isDesired = false;
  for (let word of titleWords) {
    word = word.toLowerCase();
    if (titleShouldExclude.has(word)) return false;
    if (titleShouldInclude.has(word)) isDesired = true;
  }
  return isDesired;
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
