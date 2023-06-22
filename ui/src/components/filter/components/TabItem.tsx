import React, { FC, ReactNode } from 'react';

export interface TabItemProps {
  label: string | React.ReactElement;
  children?: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabItem;
