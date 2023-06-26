import { ConfigBody } from '../../../types/types';
import { UseDataList } from './useDataList';

export default function useForm(dataListArray: UseDataList[]) {
  const clearAllItems = () => {
    for (let dataList of dataListArray) {
      dataList.clearAllItems();
    }
  };
  const getConfigBody = (): ConfigBody => {
    const data: ConfigBody = {
      location: '',
      timeRange: 'by day',
      listOfSearchKeywords: [],
      titleIncludes: [],
      titleExcludes: [],
      priorityList: {},
    };
    for (let dataList of dataListArray) {
      data[dataList.name] = dataList.data;
    }
    return data as ConfigBody;
  };

  return {
    clearAllItems,
    getConfigBody,
  };
}
