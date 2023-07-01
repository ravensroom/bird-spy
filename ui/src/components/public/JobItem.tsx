import { useState, useRef, useEffect } from 'react';
import { Job } from '../../types/types';
import api from '../../apis/api';
import { useArchivesContext } from '../../contexts/ArchivesProvider';
import ArchiveMenu from './ArchiveMenu';
import { useHeaderMessageContext } from '../../contexts/SaveMessageProvider';
import JobItemActionButton from './JobItemActionButton';

interface JobItemProps {
  job: Job;
  handleDelete: (id: string) => void;
  // handleAddButton: (id: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({
  job,
  handleDelete,
  //handleAddButton,
}) => {
  const {
    title,
    company,
    location,
    href,
    description,
    priorityPoints,
    priorityHits,
  } = job.body;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  // const [headerOffsetTop, setHeaderOffsetTop] = useState(0);
  const [isViewd, setIsViewd] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isOpen) return;
  //   const updateHeaderOffsetTop = () => {
  //     if (headerRef.current) {
  //       setHeaderOffsetTop(headerRef.current.offsetTop);
  //     }
  //   };

  //   updateHeaderOffsetTop();

  //   // Add event listener for window resize
  //   window.addEventListener('resize', updateHeaderOffsetTop);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', updateHeaderOffsetTop);
  //   };
  // }, [headerRef.current?.offsetTop, isOpen]);

  const handleMenuOpen = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleClickOpen = () => {
    // window.scrollTo({
    //   top: headerOffsetTop - 20,
    //   behavior: 'instant',
    // });

    setIsOpen(!isOpen);
    setIsViewd(true);
  };

  return (
    <div className="flex flex-col border-t-[1px] border-indigo-300">
      {/* Job header */}
      <div
        ref={headerRef}
        onClick={handleClickOpen}
        className={`${
          isOpen || isViewd
            ? 'sticky top-5 bg-indigo-200 bg-opacity-100 shadow-inner border-b-1 border-b-indigo-300'
            : ''
        } flex justify-between items-center  rounded-md rounded-t-none cursor-pointer hover:bg-indigo-100`}
      >
        <div className="flex flex-col">
          <div className="leading-[14px] ml-2 mt-1">
            <a
              href={href}
              target="_blank"
              className={`text-sm text-gray-800 font-bold ${
                isOpen || isViewd
                  ? 'hover:bg-indigo-300'
                  : 'hover:bg-indigo-200'
              } active:bg-indigo-300`}
            >
              {title}
            </a>
            {priorityHits.length > 0 && (
              <div className="flex flex-wrap leading-[7px] mt-2 gap-2 text-xs text-gray-500">
                <span>{` .${priorityPoints} | `}</span>
                {priorityHits.map((item, index) => (
                  <span key={index}>{`${item}${
                    index === priorityHits.length - 1 ? '' : ','
                  }`}</span>
                ))}
              </div>
            )}
          </div>
          <div className="text-[12px] my-1 ml-2 ">
            <span className="text-gray-800">{company}</span>
            <span className="pl-2 text-gray-600">{location}</span>
          </div>
        </div>

        <div className="flex flex-col text-sm h-full ml-1 bg-opacity-40 text-gray-700">
          <JobItemActionButton
            onClick={() => {
              handleDelete(job.id);
            }}
          >
            x
          </JobItemActionButton>
          {/* <JobItemActionButton
            onClick={() => {
              handleAddButton(job.id);
            }}
          >
            +
          </JobItemActionButton> */}
          <JobItemActionButton
            className="relative bg-purple-300"
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
          >
            +
            {menuVisible && (
              <ArchiveMenu job={job} handleDelete={handleDelete} />
            )}
          </JobItemActionButton>
        </div>
      </div>
      {/* Job descrption */}
      <div
        className={`px-5 py-2 shadow-md shadow-blue-800 text-sm bg-indigo-100 bg-opacity-50 mx-4 mb-2 sm:mx-6 text-slate-900 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  );
};

export default JobItem;
