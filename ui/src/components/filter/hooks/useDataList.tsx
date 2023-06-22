import { useState } from 'react';
import { Priorities } from '../components/FilterItem';

type UseDataList = {
  data: string[] | Priorities;
  addItem: (item: string) => void;
  deleteItem: (item: string) => void;
  clearAllItems: () => void;
};

function useDataList(initialData: string[] | Priorities): UseDataList {
  const [data, setData] = useState<string[] | Priorities>(initialData);

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
