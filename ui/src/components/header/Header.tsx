import { useContext } from 'react';
import { useSaveMessageContext } from '../../contexts/SaveMessageProvider';

const Header = () => {
  const { headerMessage } = useSaveMessageContext();
  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="top-0 z-50 w-full flex justify-center gap-2 fixed">
      <div
        onClick={handleHeaderClick}
        className="hover:cursor-pointer bg-indigo-600 bg-opacity-80 text-gray-100 text-sm px-5 font-bold shadow-md shadow-slate-600"
      >
        <span>BirdSpy</span>
      </div>
      {headerMessage && (
        <div className="p-1 rounded-md bg-pink-400 bg-opacity-80 text-xs text-white font-bold">
          {headerMessage}
        </div>
      )}
    </div>
  );
};

export default Header;
