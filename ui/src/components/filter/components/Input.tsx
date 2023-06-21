import React, { useState, ChangeEvent } from 'react';

interface InputProps {
  id: string;
  label: string;
  onAdd: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ id, label, onAdd }) => {
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

  return (
    <div className="flex items-center text-sm">
      <label className="w-40" htmlFor={id}>
        {label}:
      </label>
      <input
        className=" rounded-sm border-slate-300 border border-1"
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
      />
      <button
        className="flex items-center justify-center mx-2 w-4 h-4 rounded-sm text-white font-extrabold hover:cursor-pointer  active:bg-blue-800  bg-blue-900"
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
};

export default Input;
