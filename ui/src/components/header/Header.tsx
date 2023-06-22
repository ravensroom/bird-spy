const Header = () => {
  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="top-0 z-50 w-full flex justify-center gap-2 fixed">
      <div
        onClick={handleHeaderClick}
        className="hover:cursor-pointer bg-indigo-600 bg-opacity-80 text-gray-100 text-sm px-5 font-bold shadow-md shadow-slate-600"
      >
        Bird Spying...
      </div>
    </div>
  );
};

export default Header;
