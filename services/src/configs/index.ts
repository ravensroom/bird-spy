import { mkdir, readdir, readFile, writeFile, access } from 'fs/promises';
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
const getConfigs = async (userId: string): Promise<Config[]> => {
  try {
    const exists = await userExists(userId);
    const configsDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/configs`;

    // Read the list of config file names in the directory
    const fileNames = await readdir(configsDirName);

    // Read and parse the content of each config file
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
    }/configs`;

    const configData = await readFile(
      `${configDirName}/${configId}.json`,
      'utf-8'
    );
    return JSON.parse(configData) as Config;
  } catch (error) {
    console.log('Error reading configs:', error);
    return null;
  }
};

const configs = { saveConfig, getConfigs, getConfigById };
export default configs;
