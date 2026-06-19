import type { SummonsParams } from '../hooks/useSummonsParams';
import { formatRussianDate, formatRussianDateTime } from '../utils/generateIds';
import styles from './ConsentBlock.module.css';

interface ConsentBlockProps {
  params: SummonsParams;
}

export function ConsentBlock({ params }: ConsentBlockProps) {
  const greeting = params.name.includes(' ')
    ? params.name.split(' ')[1] || params.name
    : params.name;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Уведомление о вручении повестки</h2>

      <div className={styles.body}>
        <p className={styles.text}>
          Уважаемый(ая) <strong>{greeting}</strong>!
        </p>
        <p className={styles.text}>
          Сообщаем, что <strong>{formatRussianDateTime(params.signedDate, '14:32')}</strong> вами
          подписано усиленной квалифицированной электронной подписью согласие на обработку
          персональных данных и подтверждение получения повестки в электронной форме в соответствии
          с Федеральным законом № 53-ФЗ «О воинской обязанности и военной службе», статья 31.1.
          Повестка считается врученной с момента фиксации в реестре.
        </p>
        <p className={styles.text}>
          Вам необходимо явиться в <strong>{params.office}</strong> не позднее{' '}
          <strong>{formatRussianDate(params.date)}</strong> в <strong>{params.time}</strong> для
          прохождения мероприятий, связанных с воинским учётом.
        </p>
      </div>

      <div className={styles.epBlock}>
        <h3 className={styles.epTitle}>Данные электронной подписи</h3>
        <dl className={styles.epList}>
          <div className={styles.epRow}>
            <dt>Дата и время подписания</dt>
            <dd>{formatRussianDateTime(params.signedDate, '14:32:07')} МСК</dd>
          </div>
          <div className={styles.epRow}>
            <dt>Серийный номер сертификата</dt>
            <dd className={styles.mono}>{params.certSerial}</dd>
          </div>
          <div className={styles.epRow}>
            <dt>УИН документа</dt>
            <dd className={styles.mono}>{params.uin}</dd>
          </div>
          <div className={styles.epRow}>
            <dt>Хеш подписи (ГОСТ Р 34.11-2012)</dt>
            <dd className={styles.hash}>{params.epHash}</dd>
          </div>
          <div className={styles.epRow}>
            <dt>Статус проверки</dt>
            <dd className={styles.valid}>✓ Подпись действительна</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
