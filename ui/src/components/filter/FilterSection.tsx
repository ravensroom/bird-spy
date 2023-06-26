import FilterItem from './components/ConfigEditor';
import TabItem from './components/TabItem';
import Tabs from './components/Tabs';

const FilterSection = () => {
  return (
    <div className="sm:mx-8 md:mx-16 lg:mx-24 rounded-md pt-8 border-2 border-pink-500 border-opacity-50 border-t-0">
      <Tabs>
        <TabItem label={'Tab1'}>
          <FilterItem />
        </TabItem>
        <TabItem label={'Tab2'}>
          <FilterItem />
        </TabItem>
        <TabItem label={'+'}>
          <FilterItem />
        </TabItem>
      </Tabs>
    </div>
  );
};

export default FilterSection;
