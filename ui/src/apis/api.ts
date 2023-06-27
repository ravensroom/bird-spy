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

const rmConfig = (userId: string, configId: string): Promise<void> => {
  return fetch('http://localhost:3000/api/configs/rm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, configId }),
  }).then((response) => response.json());
};

const getConfigById = (
  userId: string,
  configId: string
): Promise<Config | null> => {
  return fetch('http://localhost:3000/api/configs/id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, configId }),
  }).then((response) => response.json());
};

const getLocalConfigs = (): Config[] => {
  const configKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith('config-')
  );

  const configs = configKeys.map(
    (key) => JSON.parse(localStorage.getItem(key)!) as Config
  );
  return configs;
};

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

const configs = {
  saveConfig,
  getConfigs,
  rmConfig,
  getConfigById,
  getLocalConfigs,
};

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
