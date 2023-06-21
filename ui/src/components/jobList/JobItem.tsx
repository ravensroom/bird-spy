import { useState } from 'react';
import { Job } from '@bird-spy/services/src/main.js';

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { title, company, location, href, description } = job;

  const handleClickBird = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col border-t-8 border-blue-800 shadow ">
      <div className="flex justify-between bg-indigo-300 rounded-md rounded-t-none">
        <div className="flex flex-col ">
          <div className="font-bold text-gray-800 text-lg px-2 pt-1">
            <a
              href={href}
              target="_blank"
              className="hover:bg-indigo-400 active:bg-indigo-500 px-2"
            >
              {title}
            </a>
          </div>

          <div className="text-xs mb-2 text-gray-800">
            <span className="mx-4">Company: {company}</span>
            <span>Location: {location}</span>
          </div>
        </div>

        <div
          onClick={handleClickBird}
          className="mx-2 mt-[10px] mb-2 shadow-inner shadow-black font-extrabold rounded-full text-[7px] pt-4 flex flex-col items-center hover:cursor-pointer bg-indigo-400 hover:bg-indigo-500"
        >
          <span
            className={`${
              isOpen ? 'bg-indigo-300' : 'bg-gray-900'
            } px-2 shadow-inner shadow-blac `}
          >
            O<span className="px-[5px]"></span> =
          </span>
          <span className="text-[8px]">
            <span className={isOpen ? 'hidden' : 'inline'}>V</span>
            <span className={isOpen ? 'inline' : 'hidden'}>o</span>
          </span>
        </div>
      </div>
      <div
        className={`px-5 py-2 shadow-md shadow-blue-800 text-md bg-indigo-200 mx-4 mb-2 sm:mx-6 text-slate-900 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};

export default JobItem;
