import React, { FunctionComponentElement, useState } from 'react';
import ConfigEditor, { ConfigEditorProps } from './ConfigEditor';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../../../types/types';
import { TrashIcon } from '@heroicons/react/24/outline';

export interface ConfigTabsProps {
  defaultIndex?: number;
  defaultConfig: Config;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
}

const ConfigTabs: React.FC<ConfigTabsProps> = ({
  defaultConfig,
  defaultIndex,
  onSelect,
  children,
}) => {
  const [tabs, setTabs] = useState<React.ReactNode[]>(() =>
    React.Children.toArray(children)
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const getDefaultConfig = () => {
    return {
      ...defaultConfig,
      id: uuidv4(),
    };
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const handleAddTab = () => {
    const newDefaultConfig = getDefaultConfig();
    const newTab = (
      <ConfigEditor
        key={newDefaultConfig.id}
        id={newDefaultConfig.id}
        config={newDefaultConfig}
      />
    );
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);

    setActiveIndex(newTabs.length - 1);
  };

  const handleDeleteTab = (index: number) => {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);

    if (index === activeIndex) {
      // If the active tab is deleted, set the new active index
      const newActiveIndex = Math.min(index, newTabs.length - 1);
      setActiveIndex(newActiveIndex);
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    // Store the index of the dragged tab
    event?.dataTransfer?.setData('text/plain', index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    // Allow dropping on this element
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLLIElement>,
    dropIndex: number
  ) => {
    // Get the index of the dragged tab
    const dragIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);

    if (!isNaN(dragIndex) && dragIndex !== dropIndex) {
      // Rearrange the tabs by swapping their positions in the array
      const newTabs = [...tabs];
      const draggedTab = newTabs[dragIndex];
      newTabs[dragIndex] = newTabs[dropIndex];
      newTabs[dropIndex] = draggedTab;
      setTabs(newTabs);

      // Update the active index to match the dropped tab's new position
      const newActiveIndex = newTabs.findIndex((tab) => tab === draggedTab);
      setActiveIndex(newActiveIndex);
    }
  };

  const renderedNavLinks = () => {
    return tabs.map((tab, index) => {
      const childElement = tab as FunctionComponentElement<ConfigEditorProps>;
      const label = childElement.props.config.name;
      return (
        <li
          className={`${
            index === activeIndex ? 'bg-transparent' : ''
          } text-sm rounded-r-md py-1 px-2 cursor-pointer border-r-2 bg-pink-200 bg-opacity-50 border-r-slate-300 hover:bg-pink-100`}
          key={`nav-item-${index}`}
          onClick={() => {
            handleClick(index);
          }}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >
          {label}
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
    <div className={``}>
      <ul className={`flex mx-2 overflow-x-auto`}>
        {renderedNavLinks()}{' '}
        <button
          onClick={handleAddTab}
          className="text-sm rounded-r-md py-1 px-2 cursor-pointer border-r-2 bg-pink-200 bg-opacity-50 border-r-slate-300 hover:bg-pink-100"
          key="add-tab-button"
        >
          +
        </button>
        <li
          onClick={() => handleDeleteTab(activeIndex || 0)}
          className="flex items-center text-sm rounded-r-md py-1 px-[6px] cursor-pointer border-r-2 bg-pink-200 bg-opacity-50 border-r-slate-300 hover:bg-pink-100"
          key="delete-tab-button"
        >
          <TrashIcon className="w-[15px] h-[15px]" />
        </li>
      </ul>
      <div className={`p-2 rounded-sm`}>{renderContent()}</div>
    </div>
  );
};

ConfigTabs.defaultProps = {
  defaultIndex: 0,
};

export default ConfigTabs;
