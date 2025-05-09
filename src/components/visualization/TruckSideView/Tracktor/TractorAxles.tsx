import clsx from 'clsx';
import { getTractorAxles } from '../renderers/axlesRenderer';
import { AxlesProps } from '../TruckSideView.types';
import styles from '../TruckSideView.module.scss';

/**
 * Renders tractor axle paths with status-based visual styling
 */
export const TractorAxles: React.FC<AxlesProps> = ({ axleCount = 2, statuses }) => {
  const paths = getTractorAxles(axleCount);

  return (
    <g id="tractor-axles">
      {paths.map((pathElem, index) => {
        const status = statuses[index] || 'default';

        // Wraps each axle path with a <g> element and applies status class
        return (
          <g key={index} className={clsx(styles.axle, status && styles[`axle--${status}`])}>
            {pathElem}
          </g>
        );
      })}
    </g>
  );
};
