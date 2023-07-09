import { useEffect, useState } from 'react';
import { useHeaderMessageContext } from '../../contexts/SaveMessageProvider';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import LoginModal from './AuthForm';
import api from '../../apis/api';
import { useUserIdContext } from '../../contexts/UserIdProvider';

const Header = () => {
  const { headerMessage } = useHeaderMessageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useUserIdContext();
  // const [isBirdNinga, setIsBirdNinga] = useState(true);

  useEffect(() => {
    const checkAndHandleId = async () => {
      const googleId = document.cookie
        .split('; ')
        .find((row) => row.startsWith('googleId'))
        ?.split('=')[1];
      const githubId = document.cookie
        .split('; ')
        .find((row) => row.startsWith('githubId'))
        ?.split('=')[1];

      if (googleId || githubId) {
        try {
          const newUser = googleId
            ? {
                id: userId,
                googleId,
              }
            : {
                id: userId,
                githubId,
              };
          const archives = await api.archives.getLocalArchives();
          const configs = await api.configs.getLocalConfigs();
          const localData = { archives, configs };

          const response = await api.users.newUserSocialLogin(
            newUser,
            localData
          );

          document.cookie =
            'googleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie =
            'githubId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (error) {
          // Handle any API call errors
        }
      }
    };

    if (userId) checkAndHandleId();
  }, [userId]);

  const handleClickHeader = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClickUser = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleClickBird = () => {
  //   setIsBirdNinga(!isBirdNinga);
  // };

  return (
    <div className="top-0 z-50 w-full flex justify-center gap-2 fixed">
      <div
        onClick={handleClickHeader}
        className="flex items-center gap-2 hover:cursor-pointer bg-indigo-600 bg-opacity-80 text-gray-100 text-sm px-5 font-bold shadow-md shadow-slate-600"
      >
        {/* <div
          onClick={handleClickBird}
          className="text-black w-6 h-6 py-1 text-[7px] shadow-inner shadow-black font-extrabold rounded-full flex flex-col items-center hover:cursor-pointer hover:bg-indigo-300 bg-indigo-500"
        >
          <div
            className={`${
              isBirdNinga ? 'bg-gray-900' : 'bg-indigo-300'
            } px-[4px] py-[3px] mt-[5px] h-[8px] shadow-inner shadow-black flex items-center gap-2 rounded-sm`}
          >
            <span>O</span>
            <span>=</span>
          </div>

          <div className="mt-[-7px]">
            <span className={isBirdNinga ? 'hidden' : 'inline'}>O</span>
            <span className={isBirdNinga ? 'inline' : 'hidden'}>V</span>
          </div>
        </div> */}
        <span>BirdSpy</span>
        <span
          onClick={handleClickUser}
          className="w-6 h-6 hover:bg-indigo-700 active:bg-indigo-800 rounded-full"
        >
          <UserCircleIcon />
        </span>
      </div>
      {headerMessage && (
        <div className="p-1 rounded-md bg-pink-400 text-xs text-white font-bold">
          {headerMessage}
        </div>
      )}
      {isModalOpen && <LoginModal handleClose={closeModal} />}
    </div>
  );
};

export default Header;
