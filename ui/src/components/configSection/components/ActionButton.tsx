interface ActionButtonProps {
  type: 'submit' | 'clear' | 'save';
  children: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-r-sm bg-opacity-20 hover:bg-opacity-20 active:bg-opacity-20 bg-indigo-200 hover:bg-indigo-300 active:bg-indigo-400 border-2 border-opacity-25 text-sm px-2 py-1 border-indigo-400 border-t-0 border-l-0"
    >
      {children}
    </button>
  );
};

export default ActionButton;
