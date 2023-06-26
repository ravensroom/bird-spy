interface InputItemProps {
  value: string;
  onDelete: (value: string) => void;
}

const InputItem: React.FC<InputItemProps> = ({ value, onDelete }) => {
  return (
    <div className="h-6 flex items-center gap-1 rounded-sm px-2 bg-pink-200 text-sm p-[3px]">
      <div className="text-gray-800">{value}</div>
      <button
        className="flex items-center justify-center w-3 h-3 rounded-sm text-white font-extrabold hover:cursor-pointer  active:bg-gray-500  bg-gray-400"
        onClick={() => {
          onDelete(value);
        }}
      >
        x
      </button>
    </div>
  );
};

export default InputItem;
