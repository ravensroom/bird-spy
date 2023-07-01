import { useEffect, useState } from 'react';
import ConfigTabs from './components/ConfigTabs';
import api from '../../apis/api';
import { useUserIdContext } from '../../contexts/UserIdProvider';
import { Config } from '../../types/types';

const ConfigSection = () => {
  const [configs, setConfigs] = useState<Config[] | null>();
  const { userId } = useUserIdContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const localConfigs = api.configs.getLocalConfigs();
      if (localConfigs.length) {
        setConfigs(localConfigs);
      } else {
        api.configs.getConfigs(userId).then((data) => {
          if (data.length === 0) {
            const newConfig: Config = {
              id: '0',
              name: 'New Search',
              userId,
              body: {
                location: 'united states',
                timeRange: 'by day',
                listOfSearchKeywords: ['software engineer'],
                titleIncludes: ['junior'],
                titleExcludes: ['senior'],
                priorityList: { citizen: -100 },
              },
            };
            setConfigs([{ ...newConfig }]);
            localStorage.setItem(
              `config-${newConfig.id}`,
              JSON.stringify(newConfig)
            );
            api.configs.saveConfig(newConfig);
          } else setConfigs(data);
        });
      }
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 mb-2 border-2 border-pink-500 border-opacity-50 border-t-0">
      {!loading && configs ? <ConfigTabs configs={configs} /> : null}
    </div>
  );
};

export default ConfigSection;
