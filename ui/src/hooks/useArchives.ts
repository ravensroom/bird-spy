import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Archive, Job } from '../types/types';
import { useUserIdContext } from '../contexts/UserIdProvider';
import api from '../apis/api';

const useArchives = () => {
  const { userId } = useUserIdContext();
  const [archives, setArchives] = useState<Archive[]>([]);
  useEffect(() => {
    if (userId) {
      const localArchives = api.archives.getLocalArchives();
      if (localArchives.length) {
        setArchives(localArchives);
      } else {
        api.archives.getArchives(userId).then((data) => {
          if (data.length > 0) setArchives(data);
          else {
            const archive = {
              id: '0',
              name: 'Saved',
              userId,
              jobs: [] as Job[],
            };
            setArchives([archive]);
            api.archives.saveArchive(archive);
            localStorage.setItem(`archive-0`, JSON.stringify(archive));
          }
        });
      }
    }
  }, [userId]);

  return { archives, setArchives };
};

export default useArchives;
