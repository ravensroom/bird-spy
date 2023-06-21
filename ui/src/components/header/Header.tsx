const Header = () => {
  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="top-0 w-full flex justify-center">
      <div
        onClick={handleHeaderClick}
        className="hover:cursor-pointer fixed bg-indigo-500 text-gray-100 text-base px-5 font-bold font-mono shadow-md shadow-slate-600"
      >
        Bird Spying...
      </div>
    </div>
  );
};

export default Header;
