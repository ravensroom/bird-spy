import api from '../../apis/api';
import { useArchivesContext } from '../../contexts/ArchivesProvider';
import { useHeaderMessageContext } from '../../contexts/SaveMessageProvider';
import { Archive, Job } from '../../types/types';

interface ArchiveMenuProps {
  job: Job;
  handleDelete: (id: string) => void;
}

const ArchiveMenu: React.FC<ArchiveMenuProps> = ({ job, handleDelete }) => {
  const { archives, setArchives } = useArchivesContext();
  const { setHeaderMessage } = useHeaderMessageContext();

  const handleAddToArchive = (job: Job, arch: Archive) => {
    if (
      arch.jobs.find((jobInArchive) => jobInArchive.id === job.id) !== undefined
    ) {
      setHeaderMessage(`Job exists!`);
      setTimeout(() => setHeaderMessage(''), 3000);

      return;
    }
    setArchives((prev) => {
      const archive = prev.find((arc) => arc.id === arch.id)!;
      archive.jobs.push(job);
      localStorage.setItem(`archive-${archive.id}`, JSON.stringify(archive));
      api.archives.saveArchive(archive);
      return prev.map((arch) => {
        if (arch.id === archive.id) return { ...archive };
        return arch;
      });
    });

    handleDelete(job.id);
    const headerMessage = `Saved to archive <${arch.name}>!`;
    setHeaderMessage(headerMessage);
    setTimeout(() => setHeaderMessage(''), 3000);
  };

  return (
    <ul className="z-[999] absolute left-[-96px] w-24 top-[-21px] shadow-sm shadow-purple-400">
      {archives.map((arch, index) => (
        <li
          onClick={() => handleAddToArchive(job, arch)}
          key={arch.id}
          className={`${
            index % 2 === 0
              ? 'bg-purple-100 hover:bg-purple-200'
              : 'bg-indigo-100 hover:bg-indigo-200'
          } py-1 px-2 text-xs `}
        >
          {arch.name}
        </li>
      ))}
    </ul>
  );
};

export default ArchiveMenu;
