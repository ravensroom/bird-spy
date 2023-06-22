import React, { useState, ChangeEvent } from 'react';
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

export interface Priorities {
  [key: string]: number;
}

const keywordsHolder = 'fullstack developer';
const titleIncludesHolder = 'junior';
const titleExcludesHolder = 'senior';
const prioritiesHolder = { citizen: -100 };
const locationHolder = 'united states';
const timeRangeHolder = 'by day';

const Filter: React.FC = () => {
  const keywords = useDataList([keywordsHolder]);
  const titleIncludes = useDataList([titleIncludesHolder]);
  const titleExcludes = useDataList([titleExcludesHolder]);
  const priorities = useDataList(prioritiesHolder);
  const locations = useDataList([locationHolder]);
  const timeRange = useDataList([timeRangeHolder]);

  const handleClearAll = () => {
    keywords.clearAllItems();
    titleIncludes.clearAllItems();
    titleExcludes.clearAllItems();
    priorities.clearAllItems();
    locations.clearAllItems();
    timeRange.clearAllItems();
  };

  const handleSave = () => {
    const data = {
      keywords: keywords.data,
      titleIncludes: titleIncludes.data,
      titleExcludes: titleExcludes.data,
      priorities: priorities.data,
      locations: locations.data,
      timeRange: timeRange.data,
    };
    fetch('http://localhost:3000/api/jobs/rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response
        console.log(result);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col">
      <Input
        id="keyword-input"
        placeHolder={keywordsHolder}
        tip="Add search queries"
        data={keywords.data}
        onAddItem={keywords.addItem}
        onDeleteItem={keywords.deleteItem}
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
        placeHolder={Object.entries(prioritiesHolder)[0].join(':')}
        data={priorities.data}
        onAddItem={priorities.addItem}
        onDeleteItem={priorities.deleteItem}
        tip="Add priorities to words found in job descriptions ranging from -100~100"
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
        <ActionButton type="submit" onClick={() => {}}>
          Search
        </ActionButton>
      </div>
    </div>
  );
};

export default Filter;
