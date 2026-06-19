import styles from './OfficialHeader.module.css';

export function OfficialHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <svg className={styles.emblem} viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#fff" strokeWidth="1.5" />
            <text x="20" y="25" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">
              РФ
            </text>
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>ЕРПВ</span>
            <span className={styles.logoSub}>Единый реестр повесток</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <span className={styles.navItem}>Реестр</span>
          <span className={styles.navItem}>Мои документы</span>
          <span className={styles.navItem}>Помощь</span>
        </nav>
      </div>
    </header>
  );
}
