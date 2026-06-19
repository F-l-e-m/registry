import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { SummonsParams } from '../hooks/useSummonsParams';
import { formatRussianDate } from '../utils/generateIds';
import styles from './SummonsDocument.module.css';

interface SummonsDocumentProps {
  params: SummonsParams;
}

export function SummonsDocument({ params }: SummonsDocumentProps) {
  const docRef = useRef<HTMLDivElement>(null);

  const qrData = `ERPW:${params.summonsNumber}|UIN:${params.uin}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!docRef.current) return;

    const canvas = await html2canvas(docRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`povestka_${params.summonsNumber}.pdf`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>Документ повестки</h2>
        <div className={`${styles.actions} no-print`}>
          <button className={styles.btn} onClick={handleDownloadPdf}>
            Скачать PDF
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handlePrint}>
            Распечатать
          </button>
        </div>
      </div>

      <div className={styles.documentWrapper}>
        <div className={styles.document} ref={docRef}>
          <div className={styles.watermark}>КОПИЯ</div>

          <div className={styles.docHeader}>
            <div className={styles.docEmblem}>
              <svg viewBox="0 0 50 50" width="50" height="50">
                <circle cx="25" cy="25" r="23" fill="none" stroke="#333" strokeWidth="1.5" />
                <text x="25" y="31" textAnchor="middle" fontSize="14" fill="#333" fontWeight="bold">
                  РФ
                </text>
              </svg>
            </div>
            <div className={styles.docTitleBlock}>
              <p className={styles.ministry}>Министерство обороны Российской Федерации</p>
              <p className={styles.officeName}>{params.office}</p>
            </div>
          </div>

          <h3 className={styles.summonsTitle}>ПОВЕСТКА № {params.summonsNumber}</h3>

          <div className={styles.fields}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Явиться:</span>
              <span className={styles.fieldValue}>
                {formatRussianDate(params.date)} в {params.time}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>По адресу:</span>
              <span className={styles.fieldValue}>{params.office}</span>
            </div>
          </div>

          <p className={styles.bodyText}>
            Вам надлежит явиться для уточнения сведений воинского учёта и прохождения
            мероприятий, связанных с призывом на военную службу. При себе иметь паспорт
            гражданина Российской Федерации, военный билет (при наличии), документы об
            образовании, свидетельство о рождении, СНИЛС, ИНН.
          </p>

          <p className={styles.bodyText}>
            В случае неявки без уважительной причины в установленный срок Вам может быть
            назначено административное наказание в соответствии со статьёй 21.5 КоАП РФ.
          </p>

          <div className={styles.docFooter}>
            <div className={styles.signature}>
              <p>Начальник отделения призыва</p>
              <p className={styles.signatureName}>полковник Смирнов А.В.</p>
              <div className={styles.signatureLine} />
            </div>

            <div className={styles.stampArea}>
              <div className={styles.stamp}>
                <svg viewBox="0 0 120 120" width="100" height="100">
                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="#1a3a6b"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#1a3a6b"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <text
                    x="60"
                    y="40"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#1a3a6b"
                    fontWeight="bold"
                  >
                    ВОЕННЫЙ
                  </text>
                  <text
                    x="60"
                    y="52"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#1a3a6b"
                    fontWeight="bold"
                  >
                    КОМИССАРИАТ
                  </text>
                  <text x="60" y="72" textAnchor="middle" fontSize="7" fill="#1a3a6b">
                    МО РФ
                  </text>
                  <text x="60" y="84" textAnchor="middle" fontSize="6" fill="#1a3a6b">
                    {params.summonsNumber}
                  </text>
                </svg>
              </div>
              <QRCodeSVG value={qrData} size={80} level="M" className={styles.qr} />
            </div>
          </div>

          <p className={styles.uinLine}>УИН: {params.uin}</p>
        </div>
      </div>
    </section>
  );
}
