import axios from 'axios';
import cheerio from 'cheerio';
import { default as config } from './config.json' assert { type: 'json' };

type TimeRange = 'byDay' | 'byWeek';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  href: string;
}

const {
  jobSites,
  listOfSearchKeywords,
  maxEntriesPerQuery,
  location,
  priority,
} = config;
const timeRange: TimeRange = config.timeRange as TimeRange;
const titleShouldExclude = new Set(config.titleShouldExclude);
const titleShouldInclude = new Set(config.titleShouldInclude);
const { linkedIn } = jobSites;

async function getLinkedInPosts() {
  const jobs = new Map<string, Job>();
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

      jobCards.each((index, jobCard) => {
        const jobId = $(jobCard)?.attr('data-entity-urn')?.split(':').at(-1);
        if (!jobId) return;
        if (jobs.has(jobId)) return;

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
          jobs.set(jobId, {
            id: jobId,
            title,
            company,
            href,
            location,
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

  return jobs;
}

async function getParsedHTML(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  return cheerio.load(html);
}

async function spy() {
  try {
    const linkedInJobs = await getLinkedInPosts();
    console.log(linkedInJobs);
  } catch (error) {
    console.error('Error:', error);
  }
}

spy();
