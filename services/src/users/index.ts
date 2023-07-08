import { writeFile, readFile, access, readdir, mkdir, rm } from 'fs/promises';
import { DB_PATH_BASE } from '../env.js';
import { Archive, Config, User } from '../types.js';
import { archives, configs } from '../main.js';
import userExists from './userExists.js';

const saveUser = async (
  user: User,
  localData: { archives: Archive[]; configs: Config[] }
): Promise<void> => {
  try {
    // remove folder that was in anonymous for this user
    const anonynousDirName = `${DB_PATH_BASE}/anonymous/${user.id}`;
    await rm(anonynousDirName, { recursive: true });
    // mkdir for this user under users/
    const userDirName = `${DB_PATH_BASE}/users/${user.id}`;
    await mkdir(userDirName, { recursive: true });
    // write auth info
    const userData = JSON.stringify(user);
    await writeFile(`${userDirName}/auth.json`, userData);
    // migrate data from localSorage to db
    for (const arch of localData.archives) {
      archives.saveArchive(arch);
    }
    for (const conf of localData.configs) {
      configs.saveConfig(conf);
    }
    console.log('User data saved:', user);
  } catch (error) {
    console.log('Error saving user data:', error);
  }
};

const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDirName = `${DB_PATH_BASE}/users/${userId}`;
    await access(`${userDirName}/auth.json`);

    const userData = await readFile(`${userDirName}/auth.json`, 'utf-8');
    return JSON.parse(userData) as User;
  } catch (error) {
    console.log('Error retrieving user data:', error);
    return null;
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const usersDirName = `${DB_PATH_BASE}/users`;
    const userFileNames = await readdir(usersDirName);

    for (const fileName of userFileNames) {
      const userDirName = `${usersDirName}/${fileName}`;
      const authFilePath = `${userDirName}/auth.json`;

      await access(authFilePath);
      const userData = await readFile(authFilePath, 'utf-8');
      const user = JSON.parse(userData) as User;

      if (user.email === email) {
        return user;
      }
    }

    return null; // User not found
  } catch (error) {
    console.log('Error retrieving user data:', error);
    return null;
  }
};

const getUserByGoogleId = async (googleId: string): Promise<User | null> => {
  try {
    const usersDirName = `${DB_PATH_BASE}/users`;
    const userFileNames = await readdir(usersDirName);

    for (const fileName of userFileNames) {
      const userDirName = `${usersDirName}/${fileName}`;
      const authFilePath = `${userDirName}/auth.json`;

      await access(authFilePath);
      const userData = await readFile(authFilePath, 'utf-8');
      const user = JSON.parse(userData) as User;

      if (user.googleId === googleId) {
        return user;
      }
    }

    return null; // User not found
  } catch (error) {
    console.log('Error retrieving user data:', error);
    return null;
  }
};

const getUserByGithubId = async (githubId: string): Promise<User | null> => {
  try {
    const usersDirName = `${DB_PATH_BASE}/users`;
    const userFileNames = await readdir(usersDirName);

    for (const fileName of userFileNames) {
      const userDirName = `${usersDirName}/${fileName}`;
      const authFilePath = `${userDirName}/auth.json`;

      await access(authFilePath);
      const userData = await readFile(authFilePath, 'utf-8');
      const user = JSON.parse(userData) as User;

      if (user.githubId === githubId) {
        return user;
      }
    }

    return null; // User
  } catch (err) {
    return null;
  }
};

const users = {
  userExists,
  saveUser,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
  getUserByGithubId,
};

export default users;
