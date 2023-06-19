import getQueryData from './utils/getQueryData.js';
import { config as loadEnv } from 'dotenv';
import { Client } from '@elastic/elasticsearch';
import getParsedHTML from './utils/getParsedHTML.js';
loadEnv({ path: new URL('../../.env.local', import.meta.url) });
const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const esclient = new Client({ node: elasticUrl });
const { rules: { priority: priorityRules }, } = getQueryData();
export async function addJob(jobId, job) {
    await esclient.index({
        index: 'job_list',
        id: jobId,
        body: job,
    });
}
export async function hasJob(jobId) {
    return await esclient.exists({
        index: 'job_list',
        id: jobId,
    });
}
async function setPriority() {
    const res = await esclient.search({
        index: 'job_list',
        body: {
            query: {
                function_score: {
                    query: {
                        match_all: {}, // Retrieve all documents
                    },
                    // script_score: {
                    //   script: calculatePriorityScript(),
                    // },
                },
            },
        },
    });
    const jobList = res.hits.hits.map((hit) => {
        const job = hit._source;
        job.priority = hit._score;
        return job;
    });
    for (const job of jobList) {
        await addJob(job.id, job);
    }
    console.log(jobList);
}
async function fetchJobContent(url) {
    const dumbURL = 'https://www.linkedin.com/jobs/view/backend-software-engineer-tiktok-privacy-ai-at-tiktok-3521244560?refId=JOzHAJ6WpAgfeNRyouft%2Fw%3D%3D&trackingId=6XUQSgJBqKfgf87UvnhTLg%3D%3D&position=25&pageNum=0&trk=public_jobs_jserp-result_search-card';
    const $ = await getParsedHTML(dumbURL);
    const jd = $('.show-more-less-html__markup');
    console.log($(jd).html());
    return '';
}
await fetchJobContent('123');
function calculatePriorityScript() {
    const priorityScript = Object.entries(priorityRules)
        .map(([keyword, value]) => `if (params._source.content.contains("${keyword}")) { return ${value}; }`)
        .join(' ');
    return `
    ${priorityScript}
    return 0;
  `;
}
// const jobs = await getJobs();
// console.log(jobs);
