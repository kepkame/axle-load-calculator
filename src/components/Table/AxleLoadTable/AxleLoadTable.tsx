import { Table } from '../Table';
import { AxleLoadTableHeader } from './AxleLoadTableHeader/AxleLoadTableHeader';
import { AxleLoadTableRow } from './AxleLoadTableRow/AxleLoadTableRow';
import { TABLE_COLUMN_HEADERS } from './data';
import { AxleLoadTableProps } from './AxleLoadTable.types';

/** Axle load display table */
export const AxleLoadTable: React.FC<AxleLoadTableProps> = ({
  control,
  trigger,
  fields,
  constraints,
  errors,
}) => {
  let truckIndex = 0;
  let trailerIndex = 0;

  return (
    <Table>
      <AxleLoadTableHeader titles={TABLE_COLUMN_HEADERS} />
      <tbody>
        {fields.map((field, index) => {
          const isTruck = field.axleType === 'truck';
          const isLifted = field.lifted === true;

          const currentNumber = isTruck ? ++truckIndex : ++trailerIndex;

          const label = `Ось ${isTruck ? 'тягача' : 'полуприцепа'} ${currentNumber} ${
            isLifted ? ' (подъёмная)' : ''
          }`;

          return (
            <AxleLoadTableRow
              key={field.id}
              control={control}
              trigger={trigger}
              index={index}
              label={label}
              axleLoadEmpty={`axleLoadData.${index}.axleLoadEmpty`}
              axleLoadLimit={`axleLoadData.${index}.axleLoadLimit`}
              isLifted={isLifted}
              errors={errors?.[index]}
              constraints={constraints}
            />
          );
        })}
      </tbody>
    </Table>
  );
};
