import clsx from 'clsx';
import type { PalletProps } from './Pallet.types';
import styles from './Pallet.module.scss';

/** Renders a single pallet rectangle for the cargo layout visualization */
export const Pallet: React.FC<PalletProps> = ({
  weight,
  pxPerMm,
  label,
  width,
  length,
  status,
}) => {
  // Convert physical size to px for visual scale.
  const widthPx = Math.floor(width * pxPerMm);
  const lengthPx = Math.floor(length * pxPerMm);
  const classes = clsx(styles.pallet, styles[`pallet--${status}`]);

  return (
    <div className={classes} style={{ width: widthPx, height: lengthPx }}>
      <span>{label}</span>
      <span>{weight}кг.</span>
    </div>
  );
};
