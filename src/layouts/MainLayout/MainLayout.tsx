import { Outlet } from 'react-router-dom';
import { Header } from '@layouts/Header/Header';
import { Footer } from '@layouts/Footer/Footer';
import { ScrollToTop } from '@components/routing/ScrollToTop';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <ScrollToTop />

        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
