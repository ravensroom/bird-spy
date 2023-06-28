import React, { FunctionComponentElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Archive } from '../../../types/types';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import api from '../../../apis/api';
import ArchiveContainer, { ArchiveContainerProps } from './ArchiveContainer';

export interface ConfigTabsProps {
  defaultIndex?: number;
  defaultArchive: Archive;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
}

const ArchiveTabs: React.FC<ConfigTabsProps> = ({
  defaultIndex,
  defaultArchive,
  onSelect,
  children,
  className,
}) => {
  const [tabs, setTabs] = useState<React.ReactNode[]>(() =>
    React.Children.toArray(children)
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [editMode, setEditMode] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const getDefaultArchive = (): Archive => {
    return {
      ...defaultArchive,
      id: uuidv4(),
      name: tabs.length > 0 ? 'New Archive' : 'Default',
      isDefault: tabs.length > 0 ? false : true,
    };
  };

  const handleAddTab = () => {
    const newArchive = getDefaultArchive();
    const newTab = (
      <ArchiveContainer key={newArchive.id} archive={newArchive} />
    );
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);

    setActiveIndex(newTabs.length - 1);
  };

  const handleDeleteTab = async (index: number) => {
    const targetTab = tabs[
      index
    ] as FunctionComponentElement<ArchiveContainerProps>;
    const { archive } = targetTab.props;
    const archiveSaved = (await api.archives.getArchiveById(
      archive.userId,
      archive.id
    ))
      ? true
      : false;
    if (archiveSaved) api.archives.rmArchive(archive.userId, archive.id);
    localStorage.removeItem(`archive-${archive.id}`);
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);

    if (index === activeIndex) {
      // If the active tab is deleted, set the new active index
      const newActiveIndex = Math.min(index, newTabs.length - 1);
      setActiveIndex(newActiveIndex);
    }
  };

  // const handleDragStart = (
  //   event: React.DragEvent<HTMLLIElement>,
  //   index: number
  // ) => {
  //   // Store the index of the dragged tab
  //   event?.dataTransfer?.setData('text/plain', index.toString());
  // };

  // const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
  //   // Allow dropping on this element
  //   event.preventDefault();
  // };

  // const handleDrop = (
  //   event: React.DragEvent<HTMLLIElement>,
  //   dropIndex: number
  // ) => {
  //   // Get the index of the dragged tab
  //   const dragIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);

  //   if (!isNaN(dragIndex) && dragIndex !== dropIndex) {
  //     // Rearrange the tabs by swapping their positions in the array
  //     const newTabs = [...tabs];
  //     const draggedTab = newTabs[dragIndex];
  //     newTabs[dragIndex] = newTabs[dropIndex];
  //     newTabs[dropIndex] = draggedTab;
  //     setTabs(newTabs);

  //     // Update the active index to match the dropped tab's new position
  //     const newActiveIndex = newTabs.findIndex((tab) => tab === draggedTab);
  //     setActiveIndex(newActiveIndex);
  //   }
  // };

  const renderedNavLinks = () => {
    return tabs.map((tab, index) => {
      const childElement =
        tab as FunctionComponentElement<ArchiveContainerProps>;
      const label = childElement.props.archive.name;

      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const newLabel = event.target.value;
        const newTabs = [...tabs];
        //@ts-ignore
        newTabs[index].props.archive.name = newLabel;
        setTabs(newTabs);
      };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          setEditMode(false);
        }
      };

      return (
        <li
          className={`${
            index === activeIndex ? 'bg-transparent' : ''
          } flex items-center px-2 py-1 text-sm rounded-r-md cursor-pointer border-r-2 bg-purple-300 bg-opacity-50 border-r-slate-400 hover:bg-purple-100`}
          key={`nav-item-${index}`}
          onClick={() => {
            handleClick(index);
          }}
          // draggable
          // onDragStart={(event) => handleDragStart(event, index)}
          // onDragOver={handleDragOver}
          // onDrop={(event) => handleDrop(event, index)}
        >
          {editMode && index === activeIndex ? (
            <input
              type="text"
              value={label}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{ width: `${Math.max(label.length, 4)}ch` }}
              className={`h-auto bg-opacity-60 rounded-md bg-white text-sm outline-none`}
            />
          ) : (
            <span>{label}</span>
          )}
        </li>
      );
    });
  };
  const renderContent = () => {
    return tabs.map((tab, index) => {
      if (index === activeIndex) {
        return tab;
      }
    });
  };
  return (
    <div className={className || ''}>
      <ul className={`flex px-2`}>
        <ul className="flex overflow-x-auto">{renderedNavLinks()} </ul>

        <button
          onClick={handleAddTab}
          className="active:text-indigo-800  text-sm rounded-r-md py-1 px-2 cursor-pointer border-r-2 bg-purple-300 bg-opacity-50 border-r-slate-400 hover:bg-purple-100"
          key="add-tab-button"
        >
          +
        </button>
        <li
          onClick={() => handleDeleteTab(activeIndex || 0)}
          className={`active:text-indigo-800  flex items-center text-sm rounded-r-md py-1 px-[6px] cursor-pointer border-r-2 bg-purple-300 bg-opacity-50 hover:bg-purple-100 border-r-slate-400 "
          key="delete-tab-button`}
        >
          <TrashIcon className="w-[15px] h-[15px]" />
        </li>
        <li
          onClick={() => {
            setEditMode(!editMode);
          }}
          className={`${
            editMode ? 'text-indigo-800' : ''
          } flex items-center text-sm rounded-r-md py-1 px-[6px] cursor-pointer border-r-2 bg-purple-300 bg-opacity-50 border-r-slate-400 hover:bg-purple-100`}
          key="edit-tab-button"
        >
          <PencilSquareIcon className="w-[15px] h-[15px]" />
        </li>
      </ul>
      <div className={`py-1 rounded-sm`}>{renderContent()}</div>
    </div>
  );
};

ArchiveTabs.defaultProps = {
  defaultIndex: 0,
};

export default ArchiveTabs;
