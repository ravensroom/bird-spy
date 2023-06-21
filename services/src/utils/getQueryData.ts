import { default as config } from '../config.json' assert { type: 'json' };

type TimeRange = 'byDay' | 'byWeek';

const { searchOptions, rules } = config;

const timeRange: TimeRange = config.searchOptions.timeRange as TimeRange;
const titleShouldExclude = new Set(config.rules.titleShouldExclude);
const titleShouldInclude = new Set(config.rules.titleShouldInclude);

export default function getQueryData() {
  return {
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
