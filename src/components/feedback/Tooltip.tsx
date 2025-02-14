import React from 'react';
import SVGIcon from '@assets/icons/sun.svg?react';
import styles from './Tooltip.module.scss';

interface ITooltipProps {
  children: React.ReactNode;
}

export const Tooltip: React.FC<ITooltipProps> = ({ children }) => {
  return (
    <div className={styles.tooltip}>
      <button className={styles.tooltipButton} aria-label="Tooltip">
        <SVGIcon />
      </button>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
