import { ConfigBody } from '../../../types/types';
import { UseDataList } from './useDataList';

export default function useAllData(dataListArray: UseDataList[]) {
  const clearAllItems = () => {
    for (let dataList of dataListArray) {
      dataList.clearAllItems();
    }
  };

  const getConfigBody = (): ConfigBody => {
    const data: ConfigBody = {
      location: 'united states',
      timeRange: 'by day',
      listOfSearchKeywords: [],
      titleIncludes: [],
      titleExcludes: [],
      priorityList: {},
    };
    for (let dataList of dataListArray) {
      if (dataList.name === 'location' || dataList.name === 'timeRange') {
        if (dataList.data.length === 0) continue;
        //@ts-ignore
        data[dataList.name] = dataList.data[0];
      } else {
        //@ts-ignore
        data[dataList.name] = dataList.data;
      }
    }
    return data as ConfigBody;
  };

  return {
    clearAllItems,
    getConfigBody,
  };
}
