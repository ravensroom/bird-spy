import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import InputItem from './InputItem';
import IconTip from './IconTip';
import { Priorities } from './FilterItem';

interface InputProps {
  id: string;
  children: React.ReactNode;
  placeHolder?: string;
  tip?: string;
  data: string[] | Priorities;
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
    <div className="flex flex-wrap h-auto p-1 gap-1 items-center text-sm m-[1px] rounded-sm shadow-inner shadow-black-100 border border-gray-400">
      <div className="flex sm:mr-0 w-full items-center sm:w-auto">
        <div className="flex-grow items-center relative w-full inline-flex">
          <div className="mr-1 text-gray-600 w-7">
            <label htmlFor={id}>
              {(tip && <IconTip content={tip}>{children}</IconTip>) || children}
            </label>
          </div>
          <input
            className="h-7 w-full pr-[21px] pl-1  bg-opacity-60 bg-white text-sm outline-none"
            type="text"
            id={id}
            placeholder={placeHolder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyEnter}
          />
          <button
            className="absolute right-[4px] flex items-center justify-center w-3 h-3 rounded-sm text-white font-extrabold hover:cursor-pointer active:bg-blue-600 bg-indigo-700 bg-opacity-70"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
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
