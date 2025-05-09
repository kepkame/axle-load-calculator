import ContentLoader from 'react-content-loader';
import styles from './LoadStatusTableSkeleton.module.scss';

export const LoadStatusTableSkeleton = () => (
  <ContentLoader
    speed={2}
    width={344}
    height={230}
    viewBox="0 0 344 230"
    backgroundColor="#e6e6e6"
    foregroundColor="#d3def8"
    className={styles.skeleton}
  >
    <rect x="8" y="9" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="9" rx="4" ry="4" width="90" height="18" />
    <rect x="0" y="37" rx="0" ry="0" width="344" height="1" />
    <rect x="8" y="47" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="47" rx="4" ry="4" width="90" height="18" />
    <rect x="1" y="75" rx="0" ry="0" width="344" height="1" />
    <rect x="8" y="85" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="85" rx="4" ry="4" width="90" height="18" />
    <rect x="5" y="113" rx="0" ry="0" width="344" height="1" />
    <rect x="8" y="123" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="123" rx="4" ry="4" width="90" height="18" />
    <rect x="5" y="151" rx="0" ry="0" width="344" height="1" />
    <rect x="8" y="162" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="161" rx="4" ry="4" width="90" height="18" />
    <rect x="5" y="189" rx="0" ry="0" width="344" height="2" />
    <rect x="8" y="200" rx="4" ry="4" width="140" height="18" />
    <rect x="248" y="200" rx="4" ry="4" width="90" height="18" />
    <rect x="0" y="228" rx="0" ry="0" width="344" height="2" />
    <rect x="224" y="0" rx="0" ry="0" width="1" height="228" />
  </ContentLoader>
);
