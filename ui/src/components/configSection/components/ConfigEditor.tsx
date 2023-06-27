import {
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  AdjustmentsVerticalIcon,
} from '@heroicons/react/24/outline';
import Input from './Input';
import useDataList from '../hooks/useDataList';
import ActionButton from './ActionButton';
import { useSaveMessageContext } from '../../../contexts/SaveMessageProvider';
import { useSearchResultsContext } from '../../../contexts/SearchResultsProvider';
import { useUserIdContext } from '../../../contexts/UserIdProvider';
import api from '../../../apis/api';
import { Config, ConfigBody } from '../../../types/types';
import useAllData from '../hooks/useAllData';
import { useState } from 'react';

const listOfSearchKeywordsHolder = 'software developer';
const titleIncludesHolder = 'junior';
const titleExcludesHolder = 'senior';
const priorityListHolder = { citizen: -100 };
const locationHolder = 'united states';
const timeRangeHolder = 'by day';

export interface ConfigEditorProps {
  id: string;
  config: Config;
}

const ConfigEditor: React.FC<ConfigEditorProps> = ({ id, config }) => {
  const localData = localStorage.getItem(`config-${id}`);
  const localConfigBody: ConfigBody | null = localData
    ? JSON.parse(localData).body
    : null;
  const propsConfigBody = config.body;
  const listOfSearchKeywords = useDataList(
    'listOfSearchKeywords',
    localConfigBody?.listOfSearchKeywords ||
      propsConfigBody.listOfSearchKeywords
  );
  const titleIncludes = useDataList(
    'titleIncludes',
    localConfigBody?.titleIncludes || config.body.titleIncludes
  );
  const titleExcludes = useDataList(
    'titleExcludes',
    localConfigBody?.titleExcludes || config.body.titleExcludes
  );
  const priorityList = useDataList(
    'priorityList',
    localConfigBody?.priorityList || config.body.priorityList
  );
  const location = useDataList('location', [
    localConfigBody?.location || config.body.location,
  ]);
  const timeRange = useDataList('timeRange', [
    localConfigBody?.timeRange || config.body.timeRange,
  ]);
  const form = useAllData([
    listOfSearchKeywords,
    titleIncludes,
    titleExcludes,
    priorityList,
    location,
    timeRange,
  ]);
  const { setHeaderMessage } = useSaveMessageContext();
  const { setResults } = useSearchResultsContext();
  const { userId } = useUserIdContext();
  const [isSearching, setIsSearching] = useState(false);
  const [fetchInterval, setFetchInterval] = useState<NodeJS.Timer | null>(null);

  const handleSearch = async () => {
    if (fetchInterval) clearInterval(fetchInterval);
    if (listOfSearchKeywords.data.length === 0) {
      // clear fetchIntervals or all
      setHeaderMessage('Please enter queries!');
      setTimeout(() => setHeaderMessage(''), 3000);
      return;
    }

    setResults([]);
    setIsSearching(true);

    const configBody = form.getConfigBody();
    const configData = {
      id,
      name: config.name,
      userId,
      body: configBody,
    };

    await api.jobs.rmJobs(userId);
    api.jobs.addJobs(configData);

    const checkStartedRunning = setInterval(async () => {
      if (await api.jobs.isRunning()) {
        clearInterval(checkStartedRunning);
      }
    }, 200);

    const fetchJobsInterval = setInterval(async () => {
      if (await api.jobs.isRunning()) {
        api.jobs.getJobs(userId).then((data) => {
          setResults(data);
        });
      } else {
        clearInterval(fetchJobsInterval);
        setIsSearching(false);
      }
    }, 1000);

    setFetchInterval(fetchJobsInterval);
  };

  const handleClearAll = () => {
    form.clearAllItems();
  };

  const handleSave = () => {
    if (listOfSearchKeywords.data.length === 0) {
      setHeaderMessage('Please enter queries!');
      setTimeout(() => setHeaderMessage(''), 3000);
      return;
    }
    const configBody = form.getConfigBody();
    const configData = {
      id,
      name: config.name,
      userId,
      body: configBody,
    };
    api.configs
      .saveConfig(configData)
      .then(() => {
        localStorage.setItem(`config-${id}`, JSON.stringify(configData));
        setHeaderMessage('Successfully saved!');
        setTimeout(() => setHeaderMessage(''), 3000);
      })
      .catch(() => {
        setHeaderMessage('Failed to save!');
      });
  };

  return (
    <div className="flex flex-col">
      <Input
        id="keyword-input"
        placeHolder={listOfSearchKeywordsHolder}
        tip="Add search queries"
        data={listOfSearchKeywords.data}
        onAddItem={listOfSearchKeywords.addItem}
        onDeleteItem={listOfSearchKeywords.deleteItem}
      >
        <MagnifyingGlassCircleIcon />
      </Input>
      <Input
        id="title-include-input"
        placeHolder={titleIncludesHolder}
        data={titleIncludes.data}
        onAddItem={titleIncludes.addItem}
        onDeleteItem={titleIncludes.deleteItem}
        tip="Add keywords that job titles should include"
      >
        <CheckCircleIcon />
      </Input>
      <Input
        id="title-exclude-input"
        placeHolder={titleExcludesHolder}
        data={titleExcludes.data}
        onAddItem={titleExcludes.addItem}
        onDeleteItem={titleExcludes.deleteItem}
        tip="Add keywords that job titles should exclude"
      >
        <XCircleIcon />
      </Input>
      <Input
        id="priority-keyword-input"
        placeHolder={Object.entries(priorityListHolder)[0].join(':')}
        data={priorityList.data}
        onAddItem={priorityList.addItem}
        onDeleteItem={priorityList.deleteItem}
        tip="Add priorityList to words found in job descriptions"
      >
        <AdjustmentsVerticalIcon />
      </Input>
      <Input
        id="priority-keyword-input"
        placeHolder={locationHolder}
        data={location.data}
        onAddItem={location.addItem}
        onDeleteItem={location.deleteItem}
        tip="Add locations"
      >
        <MapPinIcon />
      </Input>
      <Input
        id="priority-keyword-input"
        placeHolder={timeRangeHolder}
        data={timeRange.data}
        onAddItem={timeRange.addItem}
        onDeleteItem={timeRange.deleteItem}
        tip="Select time range: by day/week/month"
      >
        <CalendarDaysIcon />
      </Input>
      <div className="flex justify-end mt-1">
        <ActionButton type="clear" onClick={handleClearAll}>
          Clear all
        </ActionButton>
        <ActionButton type="save" onClick={handleSave}>
          Save
        </ActionButton>
        <ActionButton type="submit" onClick={handleSearch}>
          Search{isSearching ? 'ing...' : ''}
        </ActionButton>
      </div>
    </div>
  );
};

export default ConfigEditor;
