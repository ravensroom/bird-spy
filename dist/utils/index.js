import axios from 'axios';
import cheerio from 'cheerio';
import { default as config } from '../config.json' assert { type: 'json' };
export async function getParsedHTML(url) {
    const response = await axios.get(url);
    const html = response.data;
    return cheerio.load(html);
}
export async function getQueryData() {
    const { jobSites, searchOptions, rules } = config; //data from json
    const timeRange = config.searchOptions.timeRange;
    const titleShouldExclude = new Set(config.rules.titleShouldExclude);
    const titleShouldInclude = new Set(config.rules.titleShouldInclude);
    return {
        jobSites,
        searchOptions: {
            ...searchOptions,
            timeRange,
        },
        rules: {
            ...rules,
            titleShouldExclude,
            titleShouldInclude,
        },
    };
}
const { jobSites, searchOptions, rules } = await getQueryData();
