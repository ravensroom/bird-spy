import React, { useState, ChangeEvent } from 'react';
import InputItem from './InputItem';
import IconTip from './IconTip';

interface InputProps {
  id: string;
  children: React.ReactNode;
  placeHolder?: string;
  tip?: string;
  onAdd: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  children,
  placeHolder,
  tip,
  onAdd,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  const handleDelete = () => {};

  return (
    <div className="h-7 flex items-center text-sm m-[1px] rounded-sm shadow-inner shadow-black-100 border border-gray-400">
      <label className="text-gray-600 w-6 py-1 pl-1" htmlFor={id}>
        {(tip && <IconTip content={tip}>{children}</IconTip>) || children}
      </label>

      <div className="relative flex items-center ml-2 flex-wrap">
        <input
          className="h-5 p-2 bg-opacity-60 w-40 bg-white text-xs outline-none"
          type="text"
          id={id}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
        />
      </div>
      <button
        className="flex items-center justify-center ml-1 mr-2 w-4 h-4 rounded-sm text-white font-extrabold hover:cursor-pointer  active:bg-blue-800  bg-blue-900"
        onClick={handleAdd}
      >
        +
      </button>
      <InputItem value="hello" onDelete={handleDelete} />
    </div>
  );
};

export default Input;
