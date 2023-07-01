import { useState } from 'react';
import JobItem from '../public/JobItem.js';
import { useSearchResultsContext } from '../../contexts/SearchResultsProvider.js';

const JobList = () => {
  const [folded, setFolded] = useState(true);
  const { results, setResults } = useSearchResultsContext();
  // const { setArchives } = useArchivesContext();
  // const { setHeaderMessage } = useHeaderMessageContext();

  const handleDelete = (id: string) => {
    setResults(results.filter((job) => job.id !== id));
  };

  return (
    <>
      <div className="flex flex-col justify-center align-items sm:mx-8 md:mx-16 lg:mx-24 border-2 border-indigo-400 border-opacity-60 mb-2 rounded-sm">
        <div
          onClick={() => setFolded(!folded)}
          className="px-2 py-1 text-gray-600 text-xs cursor-pointer"
        >
          <span>Total search results: </span>
          {results.length}
        </div>
        <div className={`${folded ? 'hidden' : ''}`}>
          {results
            .sort((a, b) => b.body.priorityPoints - a.body.priorityPoints)
            .map((job) => (
              <JobItem
                key={job.userId + job.id}
                job={job}
                handleDelete={handleDelete}
                // handleAddButton={handleSaveToDefault}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default JobList;
