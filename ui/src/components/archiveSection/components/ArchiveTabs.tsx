import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import api from '../../../apis/api';
import ArchiveContainer from './ArchiveContainer';
import { useArchivesContext } from '../../../contexts/ArchivesProvider';
import { useUserIdContext } from '../../../contexts/UserIdProvider';
import NavActionButton from './NavActionButton';
import NavElement from './NavElement';

export interface ArchiveTabsProps {
  className?: string;
}

const navbarElementClassnames =
  'flex items-center text-sm rounded-r-md border-r-2 py-1 cursor-pointer bg-purple-300 bg-opacity-50 hover:bg-purple-100 border-r-slate-400';

const ArchiveTabs: React.FC<ArchiveTabsProps> = ({ className }) => {
  const { archives, setArchives } = useArchivesContext();
  const { userId } = useUserIdContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [shouldSaveEdit, setshouldSaveEdit] = useState(false);

  const handleClick = (index: number, archiveJobLength: number) => {
    setActiveIndex(index);
  };

  const handleAddTab = () => {
    const newArchive = {
      id: uuidv4(),
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
      return updatedArchives;
    });
  };

  const handleDeleteTab = async (index: number) => {
    const archive = archives[index];
    const archiveSaved = (await api.archives.getArchiveById(
      archive.userId,
      archive.id
    ))
      ? true
      : false;
    if (archiveSaved) api.archives.rmArchive(archive.userId, archive.id);
    localStorage.removeItem(`archive-${archive.id}`);

    setArchives((prev) => prev.filter((arch) => arch.id !== archive.id));
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

    const updatedArchives = archives.map((arch, idx) => {
      if (index === idx) {
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
    return archives.map((archive, index) => (
      <NavElement
        key={archive.id}
        label={archive.name}
        saveEdit={(inputValue: string) => handleSaveEdit(inputValue, index)}
        isActive={index === activeIndex}
        isDefault={archive.isDefault}
        editMode={editModeIndex === index}
        shouldSaveEdit={editModeIndex === index && shouldSaveEdit}
        onClick={() => handleClick(index, archive.jobs.length)}
        className={navbarElementClassnames}
      />
    ));
  };
  const renderContent = () => {
    return archives.map((archive, index) => {
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
