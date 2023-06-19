import getQueryData from './getQueryData.js';
import esclient from './elastic.js';
const { searchJobsByPriorityKey, addJob } = esclient;

const {
  rules: { priority: priorityRules },
} = getQueryData();

async function setPriority(): Promise<void> {
  for (let [key, value] of Object.entries(priorityRules)) {
    const jobs = await searchJobsByPriorityKey(key);
    for (let job of jobs) {
      job.priority = job.priority ?? 0 + value;
      addJob(job.id, job);
    }
  }
}

export default setPriority;
