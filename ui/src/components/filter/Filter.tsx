import React, { useState, ChangeEvent } from 'react';
import Input from './components/Input';
import SelectedList from './components/SelectedList';

interface Priority {
  keyword: string;
  value: number;
}

const Filter: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [titleShouldInclude, setTitleShouldInclude] = useState<string[]>([]);
  const [titleShouldExclude, setTitleShouldExclude] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [timeRange, setTimeRange] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleKeywordAdd = (value: string) => {
    setKeywords([...keywords, value]);
  };

  const handleTitleShouldIncludeAdd = (value: string) => {
    setTitleShouldInclude([...titleShouldInclude, value]);
  };

  const handleTitleShouldExcludeAdd = (value: string) => {
    setTitleShouldExclude([...titleShouldExclude, value]);
  };

  const handlePriorityAdd = (keyword: string, value: number) => {
    setPriorities([...priorities, { keyword, value }]);
  };

  const handleTimeRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="filter-container pb-4 sm:mx-8 md:mx-16 lg:mx-24 mt-10 bg-green-100 bg-opacity-60 rounded-md p-2 flex flex-col">
      <Input id="keyword-input" label="Keywords" onAdd={handleKeywordAdd} />
      <SelectedList items={keywords} />
      <div className="flex items-center text-sm">
        <label className="w-40 pr-2" htmlFor="time-range-select">
          Time Range:
        </label>
        <select id="time-range-select" onChange={handleTimeRangeChange}>
          <option value="">Select Time Range</option>
          <option value="byDay">By Day</option>
          <option value="byWeek">By Week</option>
        </select>
        {timeRange}
      </div>
      <div className="flex items-center text-sm">
        <label className="w-40 pr-2" htmlFor="location-input">
          Location:
        </label>
        <input
          type="text"
          id="location-input"
          onChange={handleLocationChange}
        />
        {location}
      </div>
      <Input
        id="title-include-input"
        label="Title Includes"
        onAdd={handleTitleShouldIncludeAdd}
      />
      <SelectedList items={titleShouldInclude} />

      <Input
        id="title-exclude-input"
        label="Title Excludes"
        onAdd={handleTitleShouldExcludeAdd}
      />
      <SelectedList items={titleShouldExclude} />

      <div>
        <Input
          id="priority-keyword-input"
          label="Priority Keyword"
          onAdd={handlePriorityAdd}
        />
        <Input
          id="priority-value-input"
          label="Priority Value"
          onAdd={handlePriorityAdd}
        />
        <SelectedList
          items={priorities.map(
            (priority) => `${priority.keyword} (${priority.value})`
          )}
        />
      </div>
    </div>
  );
};

export default Filter;
