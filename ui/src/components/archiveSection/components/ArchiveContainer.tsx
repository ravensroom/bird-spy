import { Archive } from '../../../types/types';
import JobItem from '../../jobList/JobItem';

export interface ArchiveContainerProps {
  archive: Archive;
}

const ArchiveContainer: React.FC<ArchiveContainerProps> = ({ archive }) => {
  return (
    <div>
      {archive.jobs.length === 0 ? (
        <div className="text-gray-800 text-xs flex ml-4 mt-1">
          Archive is empty
        </div>
      ) : (
        archive.jobs.map((job) => (
          <JobItem key={job.id} job={job} handleDelete={() => {}} />
        ))
      )}
    </div>
  );
};

export default ArchiveContainer;
