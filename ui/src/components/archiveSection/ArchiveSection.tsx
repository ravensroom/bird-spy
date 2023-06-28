import { useEffect, useState } from 'react';
import ArchiveTabs from './components/ArchiveTabs';
import { Archive, Job } from '../../types/types';
import { useUserIdContext } from '../../contexts/UserIdProvider';
import api from '../../apis/api';
import ArchiveContainer from './components/ArchiveContainer';

const ArchiveSection = () => {
  const [folded, setFolded] = useState(true);
  const [archives, setArchives] = useState<Archive[]>([]);
  const [defaultArchive, setDefaultArchive] = useState<Archive>({
    id: '',
    name: 'Default',
    userId: '',
    isDefault: true,
    jobs: [] as Job[],
  });
  const { userId } = useUserIdContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setDefaultArchive({ ...defaultArchive, userId });
      const localConfigs = api.archives.getLocalArchives();
      if (localConfigs.length) {
        console.log('Loaded archives from localStorage');
        setArchives(localConfigs);
        setLoading(false);
      } else {
        api.archives.getArchives(userId).then((data) => {
          setArchives(data);
          setLoading(false);
        });
      }
    }
  }, [userId]);

  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 border-2 rounded-sm border-purple-500 border-opacity-60 text-sm">
      <div
        onClick={() => {
          setFolded(!folded);
        }}
        className="px-2 py-1 border-purple-300 text-gray-600 text-xs cursor-pointer"
      >
        <span>Total saved jobs: </span>
        {archives.reduce((sum, arc) => sum + arc.jobs.length, 0)}
      </div>
      {!loading ? (
        <ArchiveTabs
          className={`${folded ? 'hidden' : ''}`}
          defaultArchive={{ ...defaultArchive }}
        >
          {archives.length > 0 ? (
            archives.map((archive) => (
              <ArchiveContainer key={archive.id} archive={archive} />
            ))
          ) : (
            <ArchiveContainer
              key={defaultArchive.id}
              archive={defaultArchive}
            />
          )}
        </ArchiveTabs>
      ) : null}
    </div>
  );
};

export default ArchiveSection;
