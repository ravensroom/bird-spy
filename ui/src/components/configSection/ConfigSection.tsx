import { useEffect, useState } from 'react';
import ConfigEditor from './components/ConfigEditor';
import Tabs from './components/ConfigTabs';
import api from '../../apis/api';
import { useUserIdContext } from '../../contexts/UserIdProvider';
import { Config } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const ConfigSection = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [defaultConfig, setDefaultConfig] = useState<Config>({} as Config);
  const { userId } = useUserIdContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.configs.getConfigs(userId).then((data) => {
      if (data.length) setConfigs(data);
      else {
        setDefaultConfig({
          id: uuidv4(),
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
        });
      }
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 border-2 border-pink-500 border-opacity-50 border-t-0">
      <Tabs defaultConfig={defaultConfig}>
        {userId && configs.length > 0 ? (
          configs.map((config) => (
            <ConfigEditor key={config.id} id={config.id} config={config} />
          ))
        ) : (
          <ConfigEditor
            key={defaultConfig.id}
            id={defaultConfig.id}
            config={defaultConfig}
          />
        )}
      </Tabs>
    </div>
  );
};

export default ConfigSection;
