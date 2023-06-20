import { default as config } from '../config.json' assert { type: 'json' };
const { jobSites, searchOptions, rules } = config;
const timeRange = config.searchOptions.timeRange;
const titleShouldExclude = new Set(config.rules.titleShouldExclude);
const titleShouldInclude = new Set(config.rules.titleShouldInclude);
export default function getQueryData() {
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
