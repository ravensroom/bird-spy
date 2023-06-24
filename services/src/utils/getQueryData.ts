import { readFile } from 'fs/promises';
import { Config } from '../types.js';
import { CONFIG_PATH_BASE } from '../env.js';

export default async function getQueryData() {
  const data = await readFile(CONFIG_PATH_BASE + '/config.json', 'utf-8');
  const config: Config = JSON.parse(data);

  const { searchOptions, rules } = config;
  const titleShouldExclude = new Set(config.rules.titleShouldExclude);
  const titleShouldInclude = new Set(config.rules.titleShouldInclude);

  return {
    searchOptions,
    rules: {
      ...rules,
      titleShouldExclude,
      titleShouldInclude,
    },
  };
}
