import api from '../../../apis/api';
import { useArchivesContext } from '../../../contexts/ArchivesProvider';
import { Archive } from '../../../types/types';
import JobItem from '../../public/JobItem';

export interface ArchiveContainerProps {
  archive: Archive;
}

const ArchiveContainer: React.FC<ArchiveContainerProps> = ({ archive }) => {
  const { setArchives } = useArchivesContext();
  //const handleAddNote = () => {};

  const handleDelete = (jobId: string) => {
    const Newjobs = archive.jobs.filter((job) => job.id !== jobId);
    setArchives((prev) => {
      const newArchives = prev.map((arch) => {
        if (arch.id === archive.id) {
          const newArch = { ...arch, jobs: Newjobs };
          localStorage.setItem(`archive-${arch.id}`, JSON.stringify(newArch));
          api.archives.saveArchive(newArch);
          return newArch;
        }
        return arch;
      });
      return newArchives;
    });
  };
  return (
    <div>
      {archive.jobs.length === 0 ? (
        <div className="text-gray-800 text-xs flex ml-4 mt-1">
          Archive is empty
        </div>
      ) : (
        archive.jobs.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            // handleAddButton={handleAddNote}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ArchiveContainer;
