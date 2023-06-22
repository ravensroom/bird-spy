import React, { useState, ChangeEvent } from 'react';
import {
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  AdjustmentsVerticalIcon,
} from '@heroicons/react/24/outline';
import Input from './components/Input';

interface Priorities {
  [key: string]: number;
}

const Filter: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [titleShouldInclude, setTitleShouldInclude] = useState<string[]>([]);
  const [titleShouldExclude, setTitleShouldExclude] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<Priorities>({});

  const handleKeywordAdd = (value: string) => {
    setKeywords([...keywords, value]);
  };

  const handleTitleShouldIncludeAdd = (value: string) => {
    setTitleShouldInclude([...titleShouldInclude, value]);
  };

  const handleTitleShouldExcludeAdd = (value: string) => {
    setTitleShouldExclude([...titleShouldExclude, value]);
  };

  const handlePriorityAdd = (value: string) => {
    const [key, val] = value.split(' ');
    setPriorities((prev) => ({
      ...prev,
      [key]: Number(val),
    }));
  };

  return (
    <div className="filter-container pb-4 sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 flex flex-col">
      <Input
        id="keyword-input"
        placeHolder="fullstack developer"
        tip="Add search queries"
        onAdd={handleKeywordAdd}
      >
        <MagnifyingGlassCircleIcon />
      </Input>
      <Input
        id="title-include-input"
        placeHolder="junior"
        tip="Add keywords that job titles should include"
        onAdd={handleTitleShouldIncludeAdd}
      >
        <CheckCircleIcon />
      </Input>

      <Input
        id="title-exclude-input"
        placeHolder="senior"
        tip="Add keywords that job titles should exclude"
        onAdd={handleTitleShouldExcludeAdd}
      >
        <XCircleIcon />
      </Input>

      <div>
        <Input
          id="priority-keyword-input"
          placeHolder="citizen: -100"
          tip="Add priorities to words found in job descriptions ranging from -100~100"
          onAdd={handlePriorityAdd}
        >
          <AdjustmentsVerticalIcon />
        </Input>
      </div>
    </div>
  );
};

export default Filter;
