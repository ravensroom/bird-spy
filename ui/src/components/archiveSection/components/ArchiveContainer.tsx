import { Archive } from '../../../types/types';

export interface ArchiveContainerProps {
  archive: Archive;
}

const ArchiveContainer: React.FC<ArchiveContainerProps> = ({ archive }) => {
  //const localData = localStorage.getItem(`archive-${archive.id}`);
  if (archive.jobs.length === 0)
    return (
      <div className="text-gray-800 text-xs flex ml-4 mt-1">
        Archive is empty
      </div>
    );
  return <div>{archive.name}</div>;
};

export default ArchiveContainer;
