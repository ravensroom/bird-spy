import React, { FunctionComponentElement, useState } from 'react';
import { TabItemProps } from './TabItem';

export interface TabsProps {
  defaultIndex?: number;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ defaultIndex, onSelect, children }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const renderedNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label } = childElement.props;
      return (
        <li
          className={`${
            index === activeIndex ? 'bg-opacity-0 ' : ''
          } text-sm rounded-r-md py-1 px-2 cursor-pointer border-r-2 bg-pink-200 bg-opacity-50 border-r-slate-300 hover:bg-pink-100`}
          key={`nav-item-${index}`}
          onClick={() => {
            handleClick(index);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={``}>
      <ul className={`flex`}>{renderedNavLinks()}</ul>
      <div className={`p-2 rounded-sm bg-opacity-2`}>{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
};

export default Tabs;
