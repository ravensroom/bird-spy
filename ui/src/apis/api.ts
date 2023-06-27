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

const addJobs = (config: Config): Promise<void> => {
  return fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  }).then((response) => response.json());
};

const getJobs = (userId: string): Promise<Job[]> => {
  const url = `http://localhost:3000/api/jobs?userId=${userId}`;
  return fetch(url, {}).then((response) => response.json());
};

const rmJobs = (userId: string): Promise<Job[]> => {
  const url = `http://localhost:3000/api/jobs/rm?userId=${userId}`;
  return fetch(url, {}).then((response) => response.json());
};

const isRunning = async () => {
  const { hasRunningJob } = await fetch(
    'http://localhost:3000/api/jobs/run',
    {}
  ).then((response) => {
    return response.json();
  });
  return hasRunningJob;
};

const configs = { saveConfig, getConfigs };

const jobs = {
  addJobs,
  getJobs,
  rmJobs,
  isRunning,
};

const api = {
  configs,
  jobs,
};

export default api;
