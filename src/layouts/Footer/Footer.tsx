import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const data = new Date();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <span>© {data.getFullYear()}</span>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
};
