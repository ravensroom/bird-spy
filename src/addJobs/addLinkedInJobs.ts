import getParsedHTML from '../utils/getParsedHTML.js';
import esclient from '../utils/elastic.js';
import { LinkedIn, SearchOptions, Rules } from './index.js';

const { addJob, hasJob } = esclient;

async function fetchJobContent(url: string): Promise<string> {
  const $ = await getParsedHTML(url);
  const jd = $('.show-more-less-html__markup');
  return $(jd).html() || '';
}

async function addLinkedInJobs(
  linkedIn: LinkedIn,
  searchOptions: SearchOptions,
  rules: Rules
): Promise<void> {
  const { listOfSearchKeywords, timeRange, location, maxEntriesPerQuery } =
    searchOptions;
  const { titleShouldExclude, titleShouldInclude } = rules;

  for (let keywords of listOfSearchKeywords) {
    let start = 0,
      totalEntries;
    do {
      const url =
        linkedIn.url.base +
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

      const $ = await getParsedHTML(url);
      if (!totalEntries)
        totalEntries = +$('.results-context-header__job-count')
          .text()
          .replace(/[\,\+]/g, '');

      const jobCards = $('.jobs-search__results-list .base-card');

      jobCards.each(async (index, jobCard) => {
        const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
        if (!jobId) return;
        if (await hasJob(jobId)) return;

        const linkElement = $(jobCard).find('.base-card__full-link')[0];
        const href = $(linkElement).attr('href') as string;

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

        const titleWords = title.split(/\s+|[,;|]/);
        let isDesired = false;
        for (let word of titleWords) {
          if (titleShouldExclude.has(word.toLowerCase())) return;
          if (titleShouldInclude.has(word.toLowerCase())) isDesired = true;
        }
        if (isDesired) {
          const description = await fetchJobContent(href);
          addJob(jobId, {
            id: jobId,
            title,
            company,
            href,
            location,
            description,
            priority: 0,
          });
        }
      });

      start += linkedIn.maxEntriesPerPage;
    } while (
      start <
      (maxEntriesPerQuery
        ? Math.min(maxEntriesPerQuery, totalEntries)
        : totalEntries)
    );
  }
}

export default addLinkedInJobs;
