import styles from './header.module.css';
import logo from '@/images/logo.png';
import Link from 'next/link';
import cs from 'classnames';

const HeaderContent = ({ items, logoMap, showLeft, leftItems }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={cs(styles.leftHeader, showLeft && styles.showLeft)}>
          {leftItems &&
            leftItems.map((item) => {
              if (typeof item === 'string') {
                return (
                  <div key={item} className={styles.leftItem}>
                    {item}
                  </div>
                );
              }
            })}
        </div>
        <div className={styles.logoContainer}>
          <Link href={'/'}>
            <div
              className={styles.logo}
              style={{ '--logo': `url('${logoMap.mainLogo}')` }}
            />
          </Link>
        </div>
        <div className={styles.rightHeader}>
          {items &&
            items.map(({ url, text }) => {
              return (
                <Link key={url} href={url}>
                  <div className={styles.item}>{text}</div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default HeaderContent;