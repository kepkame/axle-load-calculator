import { LoadStatusTableHeader } from './LoadStatusTableHeader/LoadStatusTableHeader';
import { LoadStatusRow } from './LoadStatusTableRows/LoadStatusRow';
import { LoadStatusTableFooter } from './LoadStatusTableFooter/LoadStatusTableFooter';
import type { LoadStatusTableProps } from './LoadStatusTable.types';

export const LoadStatusTable: React.FC<LoadStatusTableProps> = ({ rows, step1Data, step2Data }) => {
  return (
    <>
      <LoadStatusTableHeader />

      <tbody>
        {rows.map((row) => {
          return <LoadStatusRow key={row.axleKey} row={row} />;
        })}
      </tbody>

      <LoadStatusTableFooter step1Data={step1Data} step2Data={step2Data} />
    </>
  );
};
