import { useEffect, useState } from 'react';
import ArchiveTabs from './components/ArchiveTabs';
import { useArchivesContext } from '../../contexts/ArchivesProvider';

const ArchiveSection = () => {
  const [folded, setFolded] = useState(true);
  const [loading, setLoading] = useState(true);
  const { archives } = useArchivesContext();
  const [activeTabLength, setActiveTabLength] = useState<number | null>(null);

  useEffect(() => {
    if (archives.length > 0) {
      setLoading(false);
      setFolded(false);
    }
  }, [archives]);

  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 border-2 rounded-sm border-purple-500 border-opacity-60 text-sm">
      <div
        onClick={() => {
          setFolded(!folded);
        }}
        className="px-2 py-1 border-purple-300 text-gray-600 text-xs cursor-pointer"
      >
        <span>
          Total saved jobs:{' '}
          {archives.reduce((sum, arc) => sum + arc.jobs.length, 0)}{' '}
        </span>
        {!folded && activeTabLength ? (
          <span className="text-gray-900">
            {'&   '}
            {activeTabLength}
            at current archive
          </span>
        ) : null}
      </div>
      {!loading ? (
        <ArchiveTabs
          className={`${folded ? 'hidden' : ''}`}
          setActiveTabLength={setActiveTabLength}
        />
      ) : null}
    </div>
  );
};

export default ArchiveSection;
