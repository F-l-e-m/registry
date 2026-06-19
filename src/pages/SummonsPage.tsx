import { useState, useEffect } from 'react';
import { LoadingSequence } from '../components/LoadingSequence';
import { OfficialHeader } from '../components/OfficialHeader';
import { StatusBanner } from '../components/StatusBanner';
import { ConsentBlock } from '../components/ConsentBlock';
import { SummonsDocument } from '../components/SummonsDocument';
import { GosuslugiModal } from '../components/GosuslugiModal';
import { LegalFooter } from '../components/LegalFooter';
import { useSummonsParams } from '../hooks/useSummonsParams';
import {
  formatRussianDate,
  daysUntil,
} from '../utils/generateIds';
import styles from './SummonsPage.module.css';

export function SummonsPage() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState('определяется...');
  const params = useSummonsParams();

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}`);
        } else if (data.city) {
          setLocation(data.city);
        }
      })
      .catch(() => {
        setLocation('не удалось определить');
      });
  }, []);

  const daysLeft = daysUntil(params.date);

  if (loading) {
    return <LoadingSequence onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={styles.page}>
      <OfficialHeader />
      <StatusBanner />

      <main className={styles.main}>
        <div className={styles.metaBar}>
          <span>УИН: {params.uin}</span>
          <span>№ повестки: {params.summonsNumber}</span>
          <span className={styles.location}>Место открытия: {location}</span>
        </div>

        <div className={styles.warningBox}>
          <strong>Внимание!</strong> Уклонение от явки по повестке влечёт административную
          ответственность в соответствии со статьёй 21.5 КоАП РФ (штраф от 10 000 до 30 000
          рублей).
        </div>

        <div className={styles.countdown}>
          До даты явки осталось: <strong>{daysLeft}</strong>{' '}
          {daysLeft === 1 ? 'день' : daysLeft >= 2 && daysLeft <= 4 ? 'дня' : 'дней'}
        </div>

        <ConsentBlock params={params} />

        <SummonsDocument params={params} />

        <section className={styles.history}>
          <h3 className={styles.historyTitle}>История действий</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Действие</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatRussianDate(params.registryDate)}</td>
                <td>Внесение в реестр повесток</td>
                <td className={styles.statusDone}>Выполнено</td>
              </tr>
              <tr>
                <td>{formatRussianDate(params.signedDate)}</td>
                <td>Подписание ЭП (согласие на получение)</td>
                <td className={styles.statusDone}>Выполнено</td>
              </tr>
              <tr>
                <td>{formatRussianDate(params.date)}</td>
                <td>Явка в военный комиссариат</td>
                <td className={styles.statusPending}>Ожидает явки</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className={`${styles.authBlock} no-print`}>
          <p className={styles.authText}>
            Для подтверждения личности и просмотра полной информации необходима авторизация
          </p>
          <button className={styles.gosuslugiBtn} onClick={() => setModalOpen(true)}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect width="24" height="24" rx="3" fill="#fff" />
              <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#0d4cd3" fontWeight="bold">
                Г
              </text>
            </svg>
            Войти через Госуслуги
          </button>
        </div>
      </main>

      <LegalFooter />
      <GosuslugiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
