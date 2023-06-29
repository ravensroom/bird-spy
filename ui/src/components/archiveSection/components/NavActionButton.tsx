interface NavActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const NavActionButton: React.FC<NavActionButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <li
      onClick={onClick}
      className={`active:text-indigo-800 px-[6px] ${className}`}
    >
      {children}
    </li>
  );
};

export default NavActionButton;
