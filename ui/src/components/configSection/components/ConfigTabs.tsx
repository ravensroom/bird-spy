import React, { useEffect, useState } from 'react';
import ConfigEditor from './ConfigEditor';
import { Config } from '../../../types/types';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import api from '../../../apis/api';
import { useUserIdContext } from '../../../contexts/UserIdProvider';
import NavElement from '../../public/NavElement';
import NavActionButton from '../../public/NavActionButton';

const navbarElementClassnames =
  'flex items-center text-sm rounded-r-md border-r-2 py-1 cursor-pointer bg-pink-200 bg-opacity-50 hover:bg-pink-100 border-r-slate-300';

export interface ConfigTabsProps {
  configs: Config[];
}

const ConfigTabs: React.FC<ConfigTabsProps> = ({ configs }) => {
  const [tabConfigs, setTabConfigs] = useState(
    configs.sort((c1, c2) => +c1.id - +c2.id)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [shouldSaveEdit, setshouldSaveEdit] = useState(false);
  const { userId } = useUserIdContext();

  const getConfigTemplate = () => {
    return {
      id: '',
      name: 'New Search',
      userId,
      body: {
        location: 'united states',
        timeRange: 'by day',
        listOfSearchKeywords: ['software engineer'],
        titleIncludes: ['junior'],
        titleExcludes: ['senior'],
        priorityList: { citizen: -100 },
      },
    } as Config;
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleAddTab = () => {
    const newConfig = getConfigTemplate();
    newConfig.id = `${tabConfigs.length}`;
    setTabConfigs((prev) => {
      const newConfigs = [...prev, newConfig];
      setActiveIndex(newConfigs.length - 1);
      setEditModeIndex(newConfigs.length - 1);
      return newConfigs;
    });
    localStorage.setItem(`config-${newConfig.id}`, JSON.stringify(newConfig));
    api.configs.saveConfig(newConfig);
  };

  const handleDeleteTab = async (index: number) => {
    if (tabConfigs.length === 1) return;
    const config = tabConfigs[index];
    // const configSaved = (await api.configs.getConfigById(
    //   config.userId,
    //   config.id
    // ))
    //   ? true
    //   : false;
    // if (configSaved)
    api.configs.rmConfig(config.userId, config.id);
    localStorage.removeItem(`config-${config.id}`);
    setTabConfigs((prev) => {
      const updatedConfigs = prev
        .filter((config) => +config.id !== index)
        .map((config) => {
          if (+config.id > index) {
            const newConfig: Config = { ...config, id: `${+config.id - 1}` };
            localStorage.setItem(
              `config-${newConfig.id}`,
              JSON.stringify(newConfig)
            );
            api.configs.saveConfig(newConfig);
            if (+config.id === configs.length - 1) {
              api.configs.rmConfig(config.userId, config.id);
              localStorage.removeItem(`config-${config.id}`);
            }
            return newConfig;
          }
          return config;
        });
      setActiveIndex((prevActiveIndex) => {
        if (index === prevActiveIndex) {
          const newActiveIndex = Math.min(index, updatedConfigs.length - 1);
          return newActiveIndex;
        }
        return prevActiveIndex;
      });
      return updatedConfigs;
    });
  };

  const handleSaveEdit = (value: string, index: number) => {
    setEditModeIndex(null);
    setshouldSaveEdit(false);

    const updatedConfigs = tabConfigs.map((conf) => {
      if (index === +conf.id) {
        const updatedConfig = { ...conf, name: value };
        api.configs.saveConfig(updatedConfig);
        localStorage.setItem(
          `config-${updatedConfig.id}`,
          JSON.stringify(updatedConfig)
        );
        return updatedConfig;
      }
      return conf;
    });

    setTabConfigs(updatedConfigs);
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

  //     setTabConfigs((prev) => {
  //       const newTabConfigs = [...prev];
  //       const draggedTab = newTabConfigs[dragIndex];
  //       newTabConfigs[dragIndex] = newTabConfigs[dropIndex];
  //       newTabConfigs[dropIndex] = draggedTab;
  //       setActiveIndex(
  //         newTabConfigs.findIndex((config) => config.id === draggedTab.id)
  //       );
  //       return newTabConfigs;
  //     });
  //   }
  // };

  const renderedNavLinks = () => {
    return tabConfigs.map((config, index) => (
      <NavElement
        key={config.id}
        label={config.name}
        saveEdit={(inputValue: string) => handleSaveEdit(inputValue, index)}
        isActive={index === activeIndex}
        editMode={editModeIndex === index}
        shouldSaveEdit={editModeIndex === index && shouldSaveEdit}
        onClick={() => handleClick(index)}
        className={navbarElementClassnames}
      />
    ));
  };

  const renderedContent = () => {
    return tabConfigs.map((config, index) => {
      if (index === activeIndex) {
        return <ConfigEditor key={config.id} config={config} />;
      }
    });
  };

  return (
    <div className={``}>
      <ul className={`flex mx-2 `}>
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
      <div className={`p-2 rounded-sm`}>{renderedContent()}</div>
    </div>
  );
};

export default ConfigTabs;
