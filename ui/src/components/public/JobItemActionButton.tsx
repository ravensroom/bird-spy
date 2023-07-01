interface JobItemActionButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  children?: React.ReactNode;
}

const JobItemActionButton: React.FC<JobItemActionButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  children,
}) => {
  return (
    <div
      className={`bg-indigo-300 hover:bg-indigo-400 active:bg-indigo-500 flex items-center px-1 justify-center font-extrabold hover:cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default JobItemActionButton;
