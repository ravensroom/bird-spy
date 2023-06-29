import {
  mkdir,
  readdir,
  readFile,
  writeFile,
  unlink,
  access,
} from 'fs/promises';
import { Archive } from '../types.js';
import { DB_PATH_BASE } from '../env.js';
import userExists from '../users/userExists.js';

const saveArchive = async (archive: Archive): Promise<void> => {
  try {
    const exists = await userExists(archive.userId);
    const archiveDirName = `${DB_PATH_BASE}/${exists ? 'users' : 'anonymous'}/${
      archive.userId
    }/archives`;
    await mkdir(archiveDirName, { recursive: true });
    await writeFile(
      archiveDirName + `/${archive.id}.json`,
      JSON.stringify(archive)
    );
    console.log('Wrote to', archiveDirName);
  } catch (e) {
    console.log('Error saving archive', e);
  }
};

const rmArchive = async (userId: string, archiveId: string): Promise<void> => {
  try {
    const exists = await userExists(userId);
    const archiveDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/archives`;
    await mkdir(archiveDirName, { recursive: true });
    await unlink(archiveDirName + '/' + archiveId + '.json');
    console.log('Removed archive from', archiveDirName);
  } catch (e) {
    console.log('Error removing archive', e);
  }
};

const getArchives = async (userId: string): Promise<Archive[]> => {
  try {
    const exists = await userExists(userId);
    const archivesDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/archives`;

    await mkdir(archivesDirName, { recursive: true });
    const fileNames = await readdir(archivesDirName);

    const archives = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = `${archivesDirName}/${fileName}`;
        const archiveData = await readFile(filePath, 'utf-8');
        return JSON.parse(archiveData) as Archive;
      })
    );

    return archives;
  } catch (error) {
    console.log('Error reading archives:', error);
    return [];
  }
};

const getArchiveById = async (
  userId: string,
  archiveId: string
): Promise<Archive | null> => {
  try {
    const exists = await userExists(userId);
    const archiveDirName = `${DB_PATH_BASE}/${
      exists ? 'users' : 'anonymous'
    }/${userId}/archives`;
    await access(`${archiveDirName}/${archiveId}.json`);
    const archiveData = await readFile(
      `${archiveDirName}/${archiveId}.json`,
      'utf-8'
    );
    return JSON.parse(archiveData) as Archive;
  } catch (error) {
    console.log('Error reading archive');
    return null;
  }
};

const archives = { saveArchive, getArchives, getArchiveById, rmArchive };
export default archives;
