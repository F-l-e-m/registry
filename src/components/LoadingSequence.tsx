import { useState, useEffect } from 'react';
import styles from './LoadingSequence.module.css';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const STEPS = [
  'Установление защищённого соединения с реестром повесток...',
  'Проверка статуса гражданина в ЕРПВ...',
  'Загрузка данных о вручённых повестках...',
];

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 1000;
    const interval = 25;
    const increment = 100 / (totalDuration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 50);
          return 100;
        }
        return next;
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, totalDuration / STEPS.length);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.emblem}>
          <svg viewBox="0 0 60 60" width="60" height="60">
            <circle cx="30" cy="30" r="28" fill="none" stroke="#0d4cd3" strokeWidth="2" />
            <text x="30" y="36" textAnchor="middle" fontSize="20" fill="#0d4cd3" fontWeight="bold">
              РФ
            </text>
          </svg>
        </div>
        <h2 className={styles.title}>Единый реестр повесток</h2>
        <p className={styles.subtitle}>ЕРПВ — защищённый канал связи</p>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <p className={styles.step}>{STEPS[stepIndex]}</p>
        <p className={styles.percent}>{Math.round(progress)}%</p>

        <div className={styles.secure}>
          <span className={styles.lock}>🔒</span>
          Соединение защищено протоколом TLS 1.3
        </div>
      </div>
    </div>
  );
}
