import { Link } from 'react-router-dom';
import clsx from 'clsx';
import notFoundWebp from '@assets/images/not-found/404.webp';
import notFoundJpg from '@assets/images/not-found/404.jpg';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.col, styles['col--text'])}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <Link to="/" className="btn">
          На главную
        </Link>
      </div>

      <div className={clsx(styles.col, styles['col--media'])}>
        <picture>
          <source srcSet={notFoundWebp} type="image/webp" />
          <img src={notFoundJpg} alt="Иллюстрация: грузовик и дорожный знак с цифрами 404" />
        </picture>
      </div>
    </div>
  );
};

export default NotFoundPage;
