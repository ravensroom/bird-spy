import { Archive } from '../types/types';

const saveArchive = (archive: Archive): Promise<void> => {
  return fetch('http://localhost:3000/api/archives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archive),
  }).then((response) => response.json());
};

const getArchives = (userId: string): Promise<Archive[]> => {
  const url = `http://localhost:3000/api/archives?userId=${userId}`;
  return fetch(url, {}).then((response) => response.json());
};

const rmArchive = (userId: string, archiveId: string): Promise<void> => {
  return fetch('http://localhost:3000/api/archives/rm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, archiveId }),
  }).then((response) => response.json());
};

const getArchiveById = (
  userId: string,
  archiveId: string
): Promise<Archive | null> => {
  return fetch('http://localhost:3000/api/archives/id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, archiveId }),
  }).then((response) => response.json());
};

const getLocalArchives = (): Archive[] => {
  const archiveKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith('archive-')
  );

  const archives = archiveKeys.map(
    (key) => JSON.parse(localStorage.getItem(key)!) as Archive
  );
  return archives;
};

const archives = {
  saveArchive,
  getArchives,
  rmArchive,
  getArchiveById,
  getLocalArchives,
};

export default archives;
