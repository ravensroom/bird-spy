import { Config, Job } from '../types/types';

const saveConfig = (config: Config): Promise<void> => {
  return fetch('http://localhost:3000/api/configs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  }).then((response) => response.json());
};

const getConfigs = (userId: string): Promise<Config[]> => {
  const url = `http://localhost:3000/api/configs?userId=${userId}`;
  return fetch(url, {}).then((response) => response.json());
};

// const getLocalConfigs =

const addJobs = (userId: string, config: Config): Promise<void> => {
  return fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, config }),
  }).then((response) => response.json());
};

const getJobs = (userId: string): Promise<Job[]> => {
  const url = `http://localhost:3000/api/jobs?userId=${userId}`;
  return fetch(url, {}).then((response) => response.json());
};

const configs = { saveConfig, getConfigs };

const jobs = {
  addJobs,
  getJobs,
};

const api = {
  configs,
  jobs,
};

export default api;
