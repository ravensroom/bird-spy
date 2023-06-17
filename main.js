const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const configData = fs.readFileSync('./config.json', 'utf-8');
const config = JSON.parse(configData);

let {
  timeRange,
  maxEntriesPerQuery,
  jobSites,
  titleShouldExclude,
  titleShouldInclude,
  priority,
} = config;
const { linkedIn } = jobSites;

titleShouldExclude = new Set(titleShouldExclude);
titleShouldInclude = new Set(titleShouldInclude);

async function getLinkedInPosts() {
  const jobs = new Map();
  for (let keywords of linkedIn.listOfKeywords) {
    let start = 0,
      totalEntries;
    do {
      const url =
        linkedIn.base +
        keywords +
        linkedIn.timeRange[timeRange] +
        linkedIn.start +
        start;
      const $ = await getParsedHTML(url);
      totalEntries = $('.results-context-header__job-count').text();
      const jobCards = $('.jobs-search__results-list .base-card');

      jobCards.each((index, jobCard) => {
        const jobId = $(jobCard).attr('data-entity-urn').split(':').at(-1);
        if (jobs.has(jobId)) return;

        const linkElement = $(jobCard).find('.base-card__full-link')[0];
        const href = $(linkElement).attr('href');
        const title = $(linkElement).text().trim();
        const titleWords = title.split(/\s+|[,;|]/);
        let isDesired = false;
        for (let word of titleWords) {
          if (titleShouldExclude.has(word.toLowerCase())) return;
          if (titleShouldInclude.has(word.toLowerCase())) isDesired = true;
        }
        if (isDesired) {
          jobs.set(jobId, {
            title,
            href,
          });
        }
      });

      start += linkedIn.maxEntriesPerPage;
    } while (
      start < maxEntriesPerQuery
        ? Math.min(maxEntriesPerQuery, totalEntries)
        : totalEntries
    );
  }

  return jobs;
}

async function getParsedHTML(url) {
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
