import { Link } from 'wouter';
import styles from './BasicLayout.module.css';

type BasicLayoutProps = {
  children: React.ReactNode;
};
export const BasicLayout = ({ children }: BasicLayoutProps) => (
  <div className={styles.layout}>
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        uni.proto
      </Link>
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
