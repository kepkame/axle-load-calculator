import { useCallback, useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { AnimatePresence, Reorder } from 'motion/react';

import type { FormSchemaType } from '@entities/step2Form/types';
import { FormActions } from '@components/forms/FormActions/FormActions';
import { CargoFormItem } from '../CargoFormItem/CargoFormItem';
import { ButtonAddGroup } from '../ButtonAddGroup/ButtonAddGroup';
import { useCanAddNewGroup } from '../../utils/useCanAddNewGroup';

import type { Step2FormContentProps } from './Step2FormContent.types';
import styles from './Step2FormContent.module.scss';

/**
 * Visual section of the form for managing cargo groups.
 *
 * Provides dynamic rendering, reordering, validation, and controls
 * for an array of pallet group inputs based on platform constraints.
 */
const Step2FormContent: React.FC<Step2FormContentProps> = ({
  control,
  errors,
  trigger,
  deckLengthMM,
  cargoConstraints,
}) => {
  // Determines whether a new cargo group can be added based on remaining deck space
  const canAdd = useCanAddNewGroup({ control, deckLengthMM });

  const {
    fields,
    append: appendRaw,
    remove,
    move,
  } = useFieldArray<FormSchemaType, 'cargoGroup', 'id'>({
    control,
    name: 'cargoGroup',
  });

  // Handles reordering of cargo groups using their ID values
  const handleReorder = useCallback(
    (newOrder: string[]) => {
      const oldOrder = fields.map((f) => f.id);
      const movedId = newOrder.find((id, idx) => id !== oldOrder[idx]);
      if (!movedId) return;
      const from = oldOrder.indexOf(movedId);
      const to = newOrder.indexOf(movedId);
      move(from, to);
    },
    [fields, move],
  );

  // Appends a new group with a unique groupId
  const appendGroup = useCallback(() => {
    const maxId = fields.reduce((m, f) => Math.max(m, f.groupId), 0);
    appendRaw({
      groupId: maxId + 1,
      palletId: 'EUR',
      weight: 1,
      quantity: 1,
    });
  }, [fields, appendRaw]);

  // Extracts field IDs to provide values for the reorderable group
  const values = useMemo(() => fields.map((f) => f.id), [fields]);

  return (
    <>
      {/* Renders a list of pallet groups in the form */}
      <AnimatePresence initial={false}>
        <Reorder.Group as="ul" axis="y" values={values} onReorder={handleReorder} layoutScroll>
          {fields.map((field, index) => (
            <CargoFormItem
              key={field.id}
              index={index}
              field={field}
              control={control}
              errors={errors}
              remove={remove}
              constraints={cargoConstraints}
              trigger={trigger}
              deckLengthMM={deckLengthMM}
              showHeader={fields.length > 1}
            />
          ))}
        </Reorder.Group>
      </AnimatePresence>

      <ButtonAddGroup onAddGroup={appendGroup} canAdd={canAdd} />

      {!canAdd && (
        <p className={styles.actionLimitHint}>
          Все паллеты уже заняли длину платформы. Чтобы добавить новую группу, уменьшите количество
          паллет либо удалите одну из текущих групп.
        </p>
      )}

      {/* Renders form navigation and submit buttons */}
      <FormActions />
    </>
  );
};

export default Step2FormContent;
