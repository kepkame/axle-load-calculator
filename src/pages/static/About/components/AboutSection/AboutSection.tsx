import styles from './AboutSection.module.scss';

type AboutSectionProps = {
  children: React.ReactNode;
};

export const AboutSection: React.FC<AboutSectionProps> = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};
