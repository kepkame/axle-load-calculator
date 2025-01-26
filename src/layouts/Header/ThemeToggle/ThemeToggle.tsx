import React from 'react';
import clsx from 'clsx';
import { IconButton } from '@components/ui/Button/IconButtons/IconButton';
import IconSun from '@assets/icons/sun.svg?react';
import IconMoon from '@assets/icons/moon.svg?react';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  return (
    <div className={clsx(styles.themeToggle, styles.dark)}>
      <IconButton
        onClick={() => console.log('click')}
        icon={IconMoon}
        className={`${styles.buttonToggleDark} ${styles.active}`}
        ariaLabel="Светлая тема"
      />
      <IconButton
        onClick={() => console.log('click')}
        icon={IconSun}
        className={styles.buttonToggleLight}
        ariaLabel="Тёмная тема"
      />
      <span className={styles.themeIndicator}></span>
    </div>
  );
};
