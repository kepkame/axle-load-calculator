import { AxleLoadTableHeaderProps } from './AxleLoadTableHeader.types';

/**
 * Accessible table header for axle load input table.
 *
 * Uses visually hidden markup to support screen readers while keeping layout clean for custom UI.
 */
export const AxleLoadTableHeader: React.FC<AxleLoadTableHeaderProps> = ({ titles }) => {
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
