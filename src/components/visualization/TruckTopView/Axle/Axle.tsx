import clsx from 'clsx';
import { LIFTED_AXLE_RENDER_SCALE_FACTOR } from '../data/constants';
import type { AxleProps } from './Axle.types';
import styles from './Axle.module.scss';

/** Renders a single axle as a pair of wheels (left/right) at a given vertical position */
export const Axle: React.FC<AxleProps> = ({ yPx, isLifted, status, wheelHeightPx }) => {
  const classes = clsx(styles.axle, styles[`axle--${status}`]);
  const height = isLifted ? wheelHeightPx * LIFTED_AXLE_RENDER_SCALE_FACTOR : wheelHeightPx;

  // Shift downward by half the height difference to visually center the axle
  const top = yPx - height / 2;

  // Fixed horizontal offset (-16px) assumes symmetric wheel rendering on both sides
  return (
    <>
      <div className={classes} style={{ top, left: '-16px', height }} />
      <div className={classes} style={{ top, right: '-16px', height }} />
    </>
  );
};
