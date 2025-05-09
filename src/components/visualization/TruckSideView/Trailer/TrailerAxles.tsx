import clsx from 'clsx';
import { getTrailerAxles } from '../renderers/axlesRenderer';
import { AxlesProps } from '../TruckSideView.types';
import styles from '../TruckSideView.module.scss';

/**
 * Renders trailer axle paths with status-based styling
 */
export const TrailerAxles: React.FC<AxlesProps> = ({ axleCount = 3, statuses }) => {
  const paths = getTrailerAxles(axleCount);

  return (
    <g id="trailer-axles">
      {paths.map((pathElem, index) => {
        const status = statuses[index] || 'default';

        // Wraps each axle path with a <g> and applies class for visual state
        return (
          <g key={index} className={clsx(styles.axle, status && styles[`axle--${status}`])}>
            {pathElem}
          </g>
        );
      })}
    </g>
  );
};
