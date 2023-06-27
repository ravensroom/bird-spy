import {
  mkdir,
  readdir,
  readFile,
  writeFile,
  unlink,
  access,
} from 'fs/promises';
import { Config } from '../types.js';
import { DB_PATH_BASE } from '../env.js';
import userExists from '../users/userExists.js';

const saveConfig = async (config: Config): Promise<void> => {
  try {
    const exists = await userExists(config.userId);
    const configDirName = `${DB_PATH_BASE}/${exists ? 'users' : 'anonymous'}/${
      config.userId
    }/configs`;
    await mkdir(configDirName, { recursive: true });
    await writeFile(
      configDirName + `/${config.id}.json`,
      JSON.stringify(config)
    );
    console.log(config);
    console.log('Wrote to', configDirName);
  } catch (e) {
    console.log('Error writing to config', e);
  }
};

const rmConfig = async (userId: string, configId: string): Promise<void> => {
  try {
    const exists = await userExists(userId);
    const configDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/configs`;
    await mkdir(configDirName, { recursive: true });
    await unlink(configDirName + '/' + configId + '.json');
    console.log('Removed config from', configDirName);
  } catch (e) {
    console.log('Error removing config', e);
  }
};

const getConfigs = async (userId: string): Promise<Config[]> => {
  try {
    const exists = await userExists(userId);
    const configsDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/configs`;

    await mkdir(configsDirName, { recursive: true });
    const fileNames = await readdir(configsDirName);

    const configs = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = `${configsDirName}/${fileName}`;
        const configData = await readFile(filePath, 'utf-8');
        return JSON.parse(configData) as Config;
      })
    );

    return configs;
  } catch (error) {
    console.log('Error reading configs:', error);
    return [];
  }
};

const getConfigById = async (
  userId: string,
  configId: string
): Promise<Config | null> => {
  try {
    const exists = await userExists(userId);
    const configDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/configs`;
    await access(`${configDirName}/${configId}.json`);
    const configData = await readFile(
      `${configDirName}/${configId}.json`,
      'utf-8'
    );
    return JSON.parse(configData) as Config;
  } catch (error) {
    console.log('Error reading config');
    return null;
  }
};

const configs = { saveConfig, getConfigs, getConfigById, rmConfig };
export default configs;
