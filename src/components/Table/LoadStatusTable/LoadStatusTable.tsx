import React from 'react';
import { COLUMN_TITLES } from './data';

export const AxleLoadTable: React.FC = () => {
  return (
    <>
      <thead>
        <tr>
          {COLUMN_TITLES.map((title) => (
            <td key={title}>{title}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </>
  );
};
