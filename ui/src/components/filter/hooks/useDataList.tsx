import { useState } from 'react';
import { PriorityList } from '@type/types';

export type UseDataList = {
  data: string[] | PriorityList;
  addItem: (item: string) => void;
  deleteItem: (item: string) => void;
  clearAllItems: () => void;
};

function useDataList(initialData: string[] | PriorityList): UseDataList {
  const [data, setData] = useState<string[] | PriorityList>(initialData);

  const addItem = (item: string) => {
    if (Array.isArray(data)) {
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
    data,
    addItem,
    deleteItem,
    clearAllItems,
  };
}

export default useDataList;
