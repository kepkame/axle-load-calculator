import React, { ReactNode } from 'react';

interface IDefaultReactProps {
  children: ReactNode;
}

export const DefaultLayout: React.FC<IDefaultReactProps> = ({ children }) => {
  return <div>{children}</div>;
};
