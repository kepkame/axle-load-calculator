import { TAxleLoadTableHeaderProps } from './AxleLoadTableHeader.types';

export const AxleLoadTableHeader: React.FC<TAxleLoadTableHeaderProps> = ({ titles }) => {
  return (
    <thead className="visually-hidden">
      <tr>
        {titles.map((title: string, index: number) => (
          <td key={index}>{title}</td>
        ))}
      </tr>
    </thead>
  );
};
