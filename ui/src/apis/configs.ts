import { Config } from '../types/types';

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

const configs = {
  saveConfig,
  getConfigs,
  rmConfig,
  getConfigById,
  getLocalConfigs,
};

export default configs;
