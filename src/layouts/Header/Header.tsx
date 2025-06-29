import clsx from 'clsx';
import { Logo } from '@layouts/Header/Logo/Logo';
import { NavLink } from 'react-router-dom';
// import { ThemeToggle } from '@layouts/Header/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Logo />

          <div className={styles.buttons}>
            <NavLink
              to="/about"
              className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
            >
              О проекте
            </NavLink>

            {/* TODO: Add a website theme color toggle */}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
