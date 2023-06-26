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
import useForm from '../hooks/useAllData';
import api from '../../../apis/api';
import { v4 as uuidv4 } from 'uuid';

const listOfSearchKeywordsHolder = 'software developer';
const titleIncludesHolder = 'junior';
const titleExcludesHolder = 'senior';
const priorityListHolder = { citizen: -100 };
const locationHolder = 'united states';
const timeRangeHolder = 'by day';

interface ConfigEditorProps {
  id?: string;
  name?: string;
}

const ConfigEditor: React.FC<ConfigEditorProps> = ({ id, name }) => {
  const listOfSearchKeywords = useDataList([listOfSearchKeywordsHolder]);
  const titleIncludes = useDataList([titleIncludesHolder]);
  const titleExcludes = useDataList([titleExcludesHolder]);
  const priorityList = useDataList(priorityListHolder);
  const locations = useDataList([locationHolder]);
  const timeRange = useDataList([timeRangeHolder]);
  const form = useForm([
    listOfSearchKeywords,
    titleIncludes,
    titleExcludes,
    priorityList,
    locations,
    timeRange,
  ]);
  const { setHeaderMessage } = useSaveMessageContext();
  const { setResults } = useSearchResultsContext(); // will be used in another component
  const { userId } = useUserIdContext();

  const handleSearch = () => {};

  const handleClearAll = () => {
    form.clearAllItems();
  };

  const handleSave = () => {
    const configBody = form.getAllItems();
    const config = {
      id: id || uuidv4(),
      name: name || 'Search 1',
      userId,
      body: configBody,
    };
    api.configs
      .saveConfig(config)
      .then(() => {
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
        tip="Add priorityList to words found in job descriptions ranging from -100~100"
      >
        <AdjustmentsVerticalIcon />
      </Input>
      <Input
        id="priority-keyword-input"
        placeHolder={locationHolder}
        data={locations.data}
        onAddItem={locations.addItem}
        onDeleteItem={locations.deleteItem}
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
          Search
        </ActionButton>
      </div>
    </div>
  );
};

export default ConfigEditor;
