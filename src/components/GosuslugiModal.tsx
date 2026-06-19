import { useState } from 'react';
import styles from './GosuslugiModal.module.css';

interface GosuslugiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'login' | 'loading' | 'success';

export function GosuslugiModal({ isOpen, onClose }: GosuslugiModalProps) {
  const [step, setStep] = useState<AuthStep>('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => setStep('success'), 2500);
  };

  const handleClose = () => {
    setStep('login');
    setLogin('');
    setPassword('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <svg viewBox="0 0 32 32" width="32" height="32">
              <rect width="32" height="32" rx="4" fill="#fff" />
              <text x="16" y="22" textAnchor="middle" fontSize="14" fill="#0d4cd3" fontWeight="bold">
                Г
              </text>
            </svg>
            <span>Госуслуги</span>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        <div className={styles.body}>
          {step === 'login' && (
            <>
              <h3 className={styles.title}>Вход в личный кабинет</h3>
              <p className={styles.subtitle}>
                Для подтверждения получения повестки необходима авторизация через ЕСИА
              </p>
              <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                  Логин (СНИЛС, email или телефон)
                  <input
                    type="text"
                    className={styles.input}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="000-000-000 00"
                    required
                  />
                </label>
                <label className={styles.label}>
                  Пароль
                  <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    required
                  />
                </label>
                <button type="submit" className={styles.submitBtn}>
                  Войти
                </button>
              </form>
              <p className={styles.esia}>
                Авторизация через единую систему идентификации и аутентификации (ЕСИА)
              </p>
            </>
          )}

          {step === 'loading' && (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p className={styles.loadingText}>Проверка учётной записи...</p>
              <p className={styles.loadingSub}>Сверка данных с реестром повесток</p>
            </div>
          )}

          {step === 'success' && (
            <div className={styles.successState}>
              <div className={styles.checkmark}>✓</div>
              <p className={styles.successTitle}>Доступ подтверждён</p>
              <p className={styles.successText}>
                Данные сверены с Единым реестром повесток. Статус: повестка вручена.
              </p>
              <button className={styles.submitBtn} onClick={handleClose}>
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
