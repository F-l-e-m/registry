import styles from './StatusBanner.module.css';

export function StatusBanner() {
  return (
    <div className={styles.banner}>
      <span className={styles.icon}>⚠</span>
      <div className={styles.content}>
        <strong>Статус: повестка вручена электронно</strong>
        <span className={styles.sub}>
          Документ зафиксирован в Едином реестре повесток. Явка обязательна.
        </span>
      </div>
    </div>
  );
}
