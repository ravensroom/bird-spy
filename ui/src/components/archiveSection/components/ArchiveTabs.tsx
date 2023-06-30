import React, { useEffect, useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import api from '../../../apis/api';
import ArchiveContainer from './ArchiveContainer';
import { useArchivesContext } from '../../../contexts/ArchivesProvider';
import { useUserIdContext } from '../../../contexts/UserIdProvider';
import NavActionButton from './NavActionButton';
import NavElement from './NavElement';
import { Archive } from '../../../types/types';

export interface ArchiveTabsProps {
  className?: string;
  setActiveTabLength: React.Dispatch<React.SetStateAction<number | null>>;
}

const navbarElementClassnames =
  'flex items-center text-sm rounded-r-md border-r-2 py-1 cursor-pointer bg-purple-300 bg-opacity-50 hover:bg-purple-100 border-r-slate-400';

const ArchiveTabs: React.FC<ArchiveTabsProps> = ({ className }) => {
  const { archives, setArchives } = useArchivesContext();
  const { userId } = useUserIdContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [shouldSaveEdit, setshouldSaveEdit] = useState(false);

  useEffect(() => {
    setActiveIndex(activeIndex);
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleAddTab = () => {
    const newArchive = {
      id: `${archives.length}`,
      userId,
      name: archives.length > 0 ? 'New Archive' : 'Default',
      isDefault: archives.length > 0 ? false : true,
      jobs: [],
    };

    setArchives((prev) => {
      const updatedArchives = [...prev, newArchive];
      api.archives.saveArchive(newArchive);
      localStorage.setItem(
        `archive-${newArchive.id}`,
        JSON.stringify(newArchive)
      );
      setActiveIndex(updatedArchives.length - 1);
      setEditModeIndex(updatedArchives.length - 1);
      return updatedArchives;
    });
  };

  const handleDeleteTab = async (index: number) => {
    const archive = archives.find((arch) => +arch.id === index)!;
    // const archiveSaved = (await api.archives.getArchiveById(
    //   archive.userId,
    //   archive.id
    // ))
    //   ? true
    //   : false;
    api.archives.rmArchive(archive.userId, archive.id);
    localStorage.removeItem(`archive-${archive.id}`);

    setArchives((prev) => {
      const updatedArchives = prev
        .filter((arch) => +arch.id !== index)
        .map((arch) => {
          if (+arch.id > index) {
            const newArch: Archive = { ...arch, id: `${+arch.id - 1}` };
            localStorage.setItem(
              `archive-${newArch.id}`,
              JSON.stringify(newArch)
            );
            api.archives.saveArchive(newArch);
            if (+arch.id === archives.length - 1) {
              api.archives.rmArchive(arch.userId, arch.id);
              localStorage.removeItem(`archive-${arch.id}`);
            }
            return newArch;
          }
          return arch;
        });
      return updatedArchives;
    });

    setActiveIndex((prevActiveIndex) => {
      if (index === prevActiveIndex) {
        const newActiveIndex = Math.min(index, archives.length - 2);
        return newActiveIndex;
      }
      return prevActiveIndex;
    });
  };

  const handleSaveEdit = (value: string, index: number) => {
    setEditModeIndex(null);
    setshouldSaveEdit(false);

    const updatedArchives = archives.map((arch) => {
      if (index === +arch.id) {
        const updatedArchive = { ...arch, name: value };
        api.archives.saveArchive(updatedArchive);
        localStorage.setItem(
          `archive-${updatedArchive.id}`,
          JSON.stringify(updatedArchive)
        );
        return updatedArchive;
      }
      return arch;
    });

    setArchives(updatedArchives);
  };

  const renderedNavLinks = () => {
    return archives
      .sort((a1, a2) => +a1.id - +a2.id)
      .map((archive, index) => (
        <NavElement
          key={archive.id}
          label={archive.name}
          saveEdit={(inputValue: string) => handleSaveEdit(inputValue, index)}
          isActive={index === activeIndex}
          isDefault={archive.isDefault}
          editMode={editModeIndex === index}
          shouldSaveEdit={editModeIndex === index && shouldSaveEdit}
          onClick={() => handleClick(index)}
          className={navbarElementClassnames}
        />
      ));
  };
  const renderContent = () => {
    return archives
      .sort((a1, a2) => +a1.id - +a2.id)
      .map((archive, index) => {
        if (index === activeIndex) {
          return <ArchiveContainer key={archive.id} archive={archive} />;
        }
      });
  };
  return (
    <div className={className || ''}>
      <ul className={`flex`}>
        <ul className="flex overflow-x-auto">{renderedNavLinks()} </ul>
        <NavActionButton
          className={`${navbarElementClassnames}`}
          onClick={handleAddTab}
        >
          +
        </NavActionButton>
        <NavActionButton
          className={`${navbarElementClassnames}`}
          onClick={() => handleDeleteTab(activeIndex)}
        >
          <TrashIcon className="w-[15px] h-[15px]" />
        </NavActionButton>
        <NavActionButton
          className={`${
            typeof editModeIndex === 'number' ? 'text-indigo-800' : ''
          } ${navbarElementClassnames}`}
          onClick={() => {
            if (typeof editModeIndex === 'number') {
              setshouldSaveEdit(true);
            } else {
              if (activeIndex >= 0) setEditModeIndex(activeIndex);
            }
          }}
        >
          <PencilSquareIcon className="w-[15px] h-[15px]" />
        </NavActionButton>
      </ul>
      <div className={`py-1 rounded-sm`}>{renderContent()}</div>
    </div>
  );
};

export default ArchiveTabs;
