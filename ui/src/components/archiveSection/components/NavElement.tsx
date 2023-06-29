import { useEffect, useState } from 'react';

interface NavElementProps {
  label: string;
  saveEdit: (inputValue: string) => void;
  onClick: () => void;
  isActive: boolean;
  isDefault: boolean;
  editMode: boolean;
  shouldSaveEdit: boolean;
  className?: string;
}

const NavElement: React.FC<NavElementProps> = ({
  label,
  saveEdit,
  isActive,
  isDefault,
  editMode,
  onClick,
  shouldSaveEdit,
  className,
}) => {
  const [inputValue, setInputValue] = useState(label);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveEdit(inputValue);
    }
  };

  useEffect(() => {
    if (shouldSaveEdit) {
      saveEdit(inputValue);
    }
  }, [shouldSaveEdit]);

  return (
    <li
      onClick={onClick}
      className={`${isActive ? 'bg-transparent' : ''} ${className} px-2 ${
        isDefault ? '' : ''
      }`}
    >
      {editMode && isActive ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ width: `${Math.max(inputValue.length, 4)}ch` }}
          className={`h-auto bg-opacity-60 rounded-md bg-white text-sm outline-none`}
        />
      ) : (
        <span>{label}</span>
      )}
    </li>
  );
};

export default NavElement;
