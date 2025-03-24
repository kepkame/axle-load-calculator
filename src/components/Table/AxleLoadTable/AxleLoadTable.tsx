import React from 'react';
import { Table } from '../Table';
import { AxleLoadTableHeader } from './AxleLoadTableHeader/AxleLoadTableHeader';
import { AxleLoadTableRow } from './AxleLoadTableRow/AxleLoadTableRow';
import { IAxleLoadTableProps } from './AxleLoadTable.types';
import { TABLE_COLUMN_HEADERS } from './data';

export const AxleLoadTable: React.FC<IAxleLoadTableProps> = ({
  fields,
  control,
  errors,
  constraints,
}) => {
  let truckAxleCount = 0;
  let trailerAxleCount = 0;

  return (
    <Table>
      <AxleLoadTableHeader titles={TABLE_COLUMN_HEADERS} />

      <tbody>
        {fields.map((field, index) => {
          const isTruckAxle = field.axleType === 'truck';
          const axleTypeLabel = isTruckAxle ? 'Ось тягача' : 'Ось полуприцепа';
          const axleNumber = isTruckAxle ? ++truckAxleCount : ++trailerAxleCount;
          const isLifted = field.lifted === true;
          const liftedLabel = isLifted ? ' (подъёмная)' : '';
          const label = `${axleTypeLabel} ${axleNumber}${liftedLabel}`;

          return (
            <React.Fragment key={field.id}>
              <AxleLoadTableRow
                key={field.id}
                control={control}
                errors={errors?.[index] ? errors[index] : undefined}
                label={label}
                axleLoadEmpty={`axleLoadData.${index}.axleLoadEmpty`}
                axleLoadLimit={`axleLoadData.${index}.axleLoadLimit`}
                isLifted={isLifted}
                constraints={constraints}
              />
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};
