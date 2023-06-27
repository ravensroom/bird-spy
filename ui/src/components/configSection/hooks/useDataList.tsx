import { useState } from 'react';
import { PriorityList, ConfigBody } from '../../../types/types';

export type UseDataList = {
  name: keyof ConfigBody;
  data: string[] | PriorityList;
  addItem: (item: string) => void;
  deleteItem: (item: string) => void;
  clearAllItems: () => void;
};

function useDataList(
  name: keyof ConfigBody,
  initialData: string[] | PriorityList
): UseDataList {
  const [data, setData] = useState<string[] | PriorityList>(initialData);

  const addItem = (item: string) => {
    if (Array.isArray(data)) {
      if ((name === 'timeRange' || name === 'location') && data.length > 0)
        return;
      if (!data.includes(item)) {
        setData([...data, item]);
      }
    } else {
      const [key, val] = item.split(':');
      setData((prev) => ({
        ...prev,
        [key]: Number(val),
      }));
    }
  };

  const deleteItem = (item: string) => {
    if (Array.isArray(data)) {
      const updatedData = data.filter((value) => value !== item);
      setData(updatedData);
    } else {
      setData((prev) => {
        const key = item.split(':')[0];
        const updated = { ...prev };
        //@ts-ignore
        delete updated[key];
        return updated;
      });
    }
  };

  const clearAllItems = () => {
    if (Array.isArray(data)) setData([]);
    else setData({});
  };

  return {
    name,
    data,
    addItem,
    deleteItem,
    clearAllItems,
  };
}

export default useDataList;
