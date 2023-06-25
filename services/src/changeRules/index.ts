import { Config } from '../types.js';
import { writeFile } from 'fs/promises';
import { CONFIG_PATH_BASE } from '../env.js';

export default async function changeRules(data: any) {
  try {
    const config: Config = {
      searchOptions: {
        location: data.locations[0],
        timeRange: data.timeRange[0],
        listOfSearchKeywords: data.keywords,
      },
      rules: {
        titleShouldInclude: data.titleIncludes,
        titleShouldExclude: data.titleExcludes,
        priorityList: data.priorities,
      },
    };
    await writeFile(CONFIG_PATH_BASE + '/config.json', JSON.stringify(config));
    console.log(config);
    console.log('Writing to', CONFIG_PATH_BASE + '/config.json');
    return config;
  } catch (e) {
    console.log('Error writing to config', e);
  }
}
