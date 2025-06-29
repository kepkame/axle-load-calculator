import React from 'react';
import { Link } from 'react-router-dom';
import logoPng from '@assets/images/logo/logo.png';
import logoWebp from '@assets/images/logo/logo.webp';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <source srcSet={logoPng} type="image/png" />
        <img src={logoPng} width="42" height="32" alt="Логотип ОсьПро" />
      </picture>
      <span className={styles.text}>ОсьПро</span>
    </Link>
  );
};
