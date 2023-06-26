import { ConfigBody } from '@type/types';
import { PriorityList } from '@type/types';
import { UseDataList } from './useDataList';

export default function useForm(dataListArray: UseDataList[]) {
  const clearAllItems = () => {
    for (let dataList of dataListArray) {
      dataList.clearAllItems();
    }
  };
  const getAllItems = (): ConfigBody => {
    const data: ConfigBody = {
      location: '',
      timeRange: 'by day',
      listOfSearchKeywords: [],
      titleIncludes: [],
      titleExcludes: [],
      priorityList: {},
    };
    for (let dataList of dataListArray) {
      const keyName = getVariableName(dataList);
      data[keyName] = dataList.data;
    }
    return data as ConfigBody;
  };

  return {
    clearAllItems,
    getAllItems,
  };
}

function getVariableName(value: any) {
  const variableObj = { value };
  const variableName = Object.keys(variableObj)[0];
  return variableName;
}
