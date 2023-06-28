import { useEffect, useState } from 'react';
import ConfigEditor from './components/ConfigEditor';
import ConfigTabs from './components/ConfigTabs';
import api from '../../apis/api';
import { useUserIdContext } from '../../contexts/UserIdProvider';
import { Config } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const ConfigSection = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [defaultConfig, setDefaultConfig] = useState<Config>({
    id: '',
    name: 'New Search',
    userId: '',
    body: {
      location: 'united states',
      timeRange: 'by day',
      listOfSearchKeywords: ['software engineer'],
      titleIncludes: ['junior'],
      titleExcludes: ['senior'],
      priorityList: { citizen: -100 },
    },
  });
  const { userId } = useUserIdContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setDefaultConfig({ ...defaultConfig, userId });
      const localConfigs = api.configs.getLocalConfigs();
      if (localConfigs.length) {
        console.log('Loaded configs from localStorage');
        setConfigs(localConfigs);
        setLoading(false);
      } else {
        api.configs.getConfigs(userId).then((data) => {
          setConfigs(data);
          setLoading(false);
        });
      }
    }
  }, [userId]);

  if (loading) return null;

  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 mb-2 border-2 border-pink-500 border-opacity-50 border-t-0">
      <ConfigTabs defaultConfig={{ ...defaultConfig }}>
        {configs.length > 0 ? (
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
      </ConfigTabs>
    </div>
  );
};

export default ConfigSection;
