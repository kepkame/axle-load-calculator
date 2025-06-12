import { useWatch } from 'react-hook-form';
import { Table } from '../Table';
import { AxleLoadTableHeader } from './AxleLoadTableHeader/AxleLoadTableHeader';
import { AxleLoadTableRow } from './AxleLoadTableRow/AxleLoadTableRow';
import { AxleLoadTableProps } from './AxleLoadTable.types';
import { TABLE_COLUMN_HEADERS } from './data';

/**
 * Renders a dynamic table for entering axle load values.
 *
 * Calculates per-vehicle labels, adjusts to selected axle counts,
 * and wires up validation and lifting indicators.
 */
export const AxleLoadTable: React.FC<AxleLoadTableProps> = ({
  control,
  trigger,
  fields,
  constraints,
  errors,
}) => {
  // Watch live axle count from the form to calculate visible rows
  const [truckAxlesRaw, trailerAxlesRaw] = useWatch({
    control,
    name: ['truckAxles', 'trailerAxles'],
  });

  const truckCount = Number(truckAxlesRaw) || 0;
  const trailerCount = Number(trailerAxlesRaw) || 0;
  const totalCount = truckCount + trailerCount;

  // Avoid rendering extra stale fields if FieldArray outgrew current axle config
  const visibleFields = fields.length > totalCount ? fields.slice(0, totalCount) : fields;

  let truckIndex = 0;
  let trailerIndex = 0;

  return (
    <Table>
      <AxleLoadTableHeader titles={TABLE_COLUMN_HEADERS} />
      <tbody>
        {visibleFields.map((field, index) => {
          const isTruck = field.axleType === 'truck';
          const isLifted = field.lifted === true;

          // Maintain separate display counters for each vehicle type
          const currentNumber = isTruck ? ++truckIndex : ++trailerIndex;

          // Example: "Ось тягача 2 (подъёмная)"
          const label = `Ось ${isTruck ? 'тягача' : 'полуприцепа'} ${currentNumber} ${
            isLifted ? ' (подъёмная)' : ''
          }`;

          return (
            <AxleLoadTableRow
              key={field.id}
              axleId={field.axleId}
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
