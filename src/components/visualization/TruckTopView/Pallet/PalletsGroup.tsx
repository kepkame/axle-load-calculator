import clsx from 'clsx';
import { getPalletById } from '@entities/step2Form/pallet/utils';
import { Pallet } from './Pallet';
import type { PalletsGroupProps } from './Pallet.types';
import styles from './Pallet.module.scss';

/**
 * Renders a group (row) of pallets for the trailer top view,
 * with correct color based on axle load status.
 */
export const PalletsGroup: React.FC<PalletsGroupProps> = ({ group, pxPerMm, status }) => {
  // Row styling reflects current load status (success, warning, danger, etc.)
  const classes = clsx(styles.row, styles[`row--${status}`]);

  return (
    <div className={classes}>
      {Array.from({ length: group.quantity }, (_, i) => {
        const { label, width, length } = getPalletById(group.palletId);

        return (
          <Pallet
            key={`${group.groupId}-${i}`}
            weight={group.weight}
            pxPerMm={pxPerMm}
            label={label}
            width={width}
            length={length}
            status={status}
          />
        );
      })}
    </div>
  );
};
