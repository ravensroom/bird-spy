import { Client } from '@elastic/elasticsearch';
import { Job } from '../main.js';

import { config as loadEnv } from 'dotenv';
loadEnv({ path: new URL('../../../.env.local', import.meta.url) });

const elasticUrl = process.env.ELASTIC_URL || 'http://elasticsearch:9200';
const client = new Client({ node: elasticUrl });

const index = 'job-list';

const esclient = {
  checkConnection,
  addJob,
  hasJob,
  searchJobsByPriorityKey,
  indexRefresh,
  getAllJobsSortedByPriority,
};

export default esclient;

function checkConnection(): Promise<boolean> {
  return new Promise(async (resolve) => {
    console.log('Checking connection to ElasticSearch...');
    let isConnected = false;
    while (!isConnected) {
      try {
        await client.cluster.health({});
        console.log('Successfully connected to ElasticSearch');
        isConnected = true;
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }
    resolve(true);
  });
}

export async function addJob(jobId: string, job: Job): Promise<void> {
  try {
    await client.index({
      index,
      id: jobId,
      body: job,
    });
  } catch (_) {}
}

export async function hasJob(jobId: string): Promise<boolean> {
  let result = false;
  try {
    result = await client.exists({
      index,
      id: jobId,
    });
  } catch (_) {}
  return result;
}

export async function searchJobsByPriorityKey(
  priorityKey: string
): Promise<Job[]> {
  const results = await client.search({
    index,
    body: {
      query: {
        bool: {
          must: priorityKey.split(' ').map((word: string) => ({
            term: { description: { value: word.toLowerCase() } },
          })),
        },
      },
    },
  });

  const hits = results.hits.hits;
  const jobs: Job[] = hits.map((hit: any) => hit._source);

  return jobs;
}

export async function getAllJobsSortedByPriority(): Promise<Job[]> {
  const results = await client.search({
    index,
    body: {
      query: {
        match_all: {},
      },
      sort: [{ priority: { order: 'desc' } }],
    },
  });

  const hits = results.hits.hits;
  const jobs: Job[] = hits.map((hit: any) => hit._source);

  return jobs;
}

export async function indexRefresh(): Promise<void> {
  await client.indices.refresh({ index });
}
