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
import useDataList from './hooks/useDataList';

export interface Priorities {
  [key: string]: number;
}

const Filter: React.FC = () => {
  const keywords = useDataList([]);
  const titleIncludes = useDataList([]);
  const titleExcludes = useDataList([]);
  const priorities = useDataList({});

  return (
    <div className="filter-container pb-4 sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 flex flex-col">
      <Input
        id="keyword-input"
        placeHolder="fullstack developer"
        tip="Add search queries"
        data={keywords.data}
        onAddItem={keywords.addItem}
        onDeleteItem={keywords.deleteItem}
      >
        <MagnifyingGlassCircleIcon />
      </Input>
      <Input
        id="title-include-input"
        placeHolder="junior"
        data={titleIncludes.data}
        onAddItem={titleIncludes.addItem}
        onDeleteItem={titleIncludes.deleteItem}
        tip="Add keywords that job titles should include"
      >
        <CheckCircleIcon />
      </Input>

      <Input
        id="title-exclude-input"
        placeHolder="senior"
        data={titleExcludes.data}
        onAddItem={titleExcludes.addItem}
        onDeleteItem={titleExcludes.deleteItem}
        tip="Add keywords that job titles should exclude"
      >
        <XCircleIcon />
      </Input>

      <div>
        <Input
          id="priority-keyword-input"
          placeHolder="citizen:-100"
          data={priorities.data}
          onAddItem={priorities.addItem}
          onDeleteItem={priorities.deleteItem}
          tip="Add priorities to words found in job descriptions ranging from -100~100"
        >
          <AdjustmentsVerticalIcon />
        </Input>
      </div>
    </div>
  );
};

export default Filter;
