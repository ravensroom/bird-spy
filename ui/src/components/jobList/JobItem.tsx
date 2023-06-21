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
    <div className="flex flex-col border-t-[1px] border-indigo-200 shadow-inner ">
      <div className="flex justify-between items-center bg-indigo-300 rounded-md rounded-t-none">
        <div className="flex flex-col ">
          <div className="font-bold text-gray-800 ml-2">
            <a
              href={href}
              target="_blank"
              className="text-sm hover:bg-indigo-400 active:bg-indigo-500"
            >
              {title}
            </a>
          </div>
          <div className="text-[12px] mb-2 ml-2 ">
            <span className="text-gray-800">{company}</span>
            <span className="pl-2 text-gray-600">{location}</span>
          </div>
        </div>

        <div
          onClick={handleClickBird}
          className="w-8 h-8 pt-2 mr-3 text-[8px]   shadow-inner shadow-black font-extrabold rounded-full flex flex-col items-center hover:cursor-pointer bg-indigo-400 hover:bg-indigo-500"
        >
          <div
            className={`${
              isOpen ? 'bg-indigo-300' : 'bg-gray-900'
            } px-[6px] pt-[2px] shadow-inner shadow-black flex gap-2`}
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
      <div
        className={`px-5 py-2 shadow-md shadow-blue-800 text-sm bg-indigo-200 mx-4 mb-2 sm:mx-6 text-slate-900 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  );
};

export default JobItem;
