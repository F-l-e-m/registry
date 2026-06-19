import styles from './LegalFooter.module.css';

export function LegalFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <span>О портале</span>
          <span>Правовая информация</span>
          <span>Техническая поддержка</span>
          <span>Доступность</span>
        </div>
        <p className={styles.copyright}>
          © 2026 Министерство обороны Российской Федерации. Все права защищены.
        </p>
        <p className={styles.legal}>
          Обработка персональных данных осуществляется в соответствии с Федеральным законом
          № 152-ФЗ «О персональных данных». Используя портал, вы соглашаетесь с условиями
          обработки персональных данных.
        </p>
      </div>
    </footer>
  );
}
