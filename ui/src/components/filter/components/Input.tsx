import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import InputItem from './InputItem';
import IconTip from './IconTip';
import { Priorities } from '../Filter';

interface InputProps {
  id: string;
  children: React.ReactNode;
  placeHolder?: string;
  tip?: string;
  data?: string[] | Priorities;
  onAddItem: (value: string) => void;
  onDeleteItem: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  children,
  placeHolder,
  tip,
  data,
  onAddItem,
  onDeleteItem,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (value.trim()) {
      onAddItem(value.trim());
      setValue('');
    }
  };

  return (
    <div className="flex flex-wrap h-auto gap-1 items-center text-sm m-[1px] rounded-sm shadow-inner shadow-black-100 border border-gray-400">
      <label className="text-gray-600 w-6 py-1 pl-1" htmlFor={id}>
        {(tip && <IconTip content={tip}>{children}</IconTip>) || children}
      </label>

      <div className="relative inline-block">
        <input
          className="h-5 p-2 pr-[21px] bg-opacity-60 w-50 bg-white text-xs outline-none"
          type="text"
          id={id}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyEnter}
        />
        <button
          className="absolute top-1 right-1 flex items-center justify-center w-3 h-3 rounded-sm text-white font-extrabold hover:cursor-pointer active:bg-blue-600 bg-indigo-700 bg-opacity-70"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
      {data &&
        (Array.isArray(data)
          ? data.map((content) => (
              <InputItem
                key={content}
                value={content}
                onDelete={onDeleteItem}
              />
            ))
          : Object.entries(data).map(([key, value]) => (
              <InputItem
                key={key}
                value={`${key}:${value}`}
                onDelete={onDeleteItem}
              />
            )))}
    </div>
  );
};

export default Input;
