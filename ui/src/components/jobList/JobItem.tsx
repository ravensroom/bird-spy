import { useState, useRef, useEffect } from 'react';
import { Job } from '@bird-spy/services/src/main.js';

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { title, company, location, href, description, priority } = job;
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerOffsetTop, setHeaderOffsetTop] = useState(0);
  const [isViewd, setIsViewd] = useState<boolean>(false);

  useEffect(() => {
    const updateHeaderOffsetTop = () => {
      if (headerRef.current) {
        setHeaderOffsetTop(headerRef.current.offsetTop);
      }
    };

    // Update the offsetTop initially
    updateHeaderOffsetTop();

    // Add event listener for window resize
    window.addEventListener('resize', updateHeaderOffsetTop);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateHeaderOffsetTop);
    };
  }, []);

  const handleClickBird = () => {
    window.scrollTo({
      top: headerOffsetTop - 20,
      behavior: 'instant',
    });

    setIsOpen(!isOpen);
    setIsViewd(true);
  };

  return (
    <div className="flex flex-col border-t-[1px] border-indigo-300">
      {/* Job header */}
      <div
        ref={headerRef}
        className={`${
          isOpen || isViewd
            ? 'sticky top-5 bg-indigo-200 bg-opacity-100 shadow-inner border-b-1 border-b-indigo-300'
            : ''
        } flex justify-between items-center  rounded-md rounded-t-none`}
      >
        <div className="flex flex-col">
          <div className="leading-[14px] ml-2 mt-1">
            <a
              href={href}
              target="_blank"
              className={`text-sm text-gray-800 font-bold  ${
                isOpen || isViewd
                  ? 'hover:bg-indigo-300'
                  : 'hover:bg-indigo-200'
              } active:bg-indigo-300`}
            >
              {title}
            </a>
            {job.priorityHits.length > 0 && (
              <div className="flex flex-wrap leading-[7px] my-2 gap-2 text-xs text-gray-500">
                <span>{` .${priority} | `}</span>
                {job.priorityHits.map((item, index) => (
                  <span>{`${item}${
                    index === job.priorityHits.length - 1 ? '' : ','
                  }`}</span>
                ))}
              </div>
            )}
          </div>
          <div className="text-[12px] mb-1 ml-2 ">
            <span className="text-gray-800">{company}</span>
            <span className="pl-2 text-gray-600">{location}</span>
          </div>
        </div>

        <div
          onClick={handleClickBird}
          className="w-8 h-8 pt-2 mr-3 text-[8px] shadow-inner shadow-black font-extrabold rounded-full flex flex-col items-center hover:cursor-pointer hover:bg-indigo-300 hover:bg-opacity-40"
        >
          <div
            className={`${
              isOpen ? 'bg-indigo-300' : 'bg-gray-900'
            } px-[7px] mt-[5px] h-2 shadow-inner shadow-black flex gap-2`}
          >
            <span>O</span>
            <span>=</span>
          </div>

          <div className="text-[8px]">
            <span className={isOpen ? 'hidden' : 'inline'}>V</span>
            <span className={isOpen ? 'inline' : 'hidden'}>O</span>
          </div>
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
