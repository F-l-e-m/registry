import { useState } from 'react';
import { buildShareUrl, type SummonsFormData } from '../utils/buildShareUrl';
import { getDefaultAppearanceDate } from '../utils/defaults';
import styles from './GeneratorPage.module.css';

export function GeneratorPage() {
  const [form, setForm] = useState<SummonsFormData>({
    date: getDefaultAppearanceDate(),
    time: '09:00',
    office: 'Военный комиссариат г. Москвы, ул. Яблочкова, д. 5',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof SummonsFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const url = buildShareUrl(form);
    setGeneratedUrl(url);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = generatedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Генератор ссылок</h1>
        <p>Создайте ссылку для розыгрыша</p>
      </header>

      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div className={styles.row}>
            <label className={styles.label}>
              Дата явки
              <input
                type="date"
                className={styles.input}
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Время явки
              <input
                type="time"
                className={styles.input}
                value={form.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </label>
          </div>

          <label className={styles.label}>
            Военный комиссариат (адрес)
            <input
              type="text"
              className={styles.input}
              value={form.office}
              onChange={(e) => handleChange('office', e.target.value)}
              placeholder="Военный комиссариат г. ..., ул. ..."
            />
          </label>

          <button type="submit" className={styles.generateBtn}>
            Сгенерировать ссылку
          </button>
        </form>

        {generatedUrl && (
          <div className={styles.result}>
            <h2>Готовая ссылка</h2>
            <div className={styles.urlBox}>
              <input type="text" className={styles.urlInput} value={generatedUrl} readOnly />
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>

            <div className={styles.preview}>
              <h3>Превью</h3>
              <p>Повестка № (авто)</p>
              <p>
                Явка: {form.date} в {form.time}
              </p>
              <p>{form.office}</p>
            </div>
          </div>
        )}

        <div className={styles.hint}>
          <p>
            Отправьте ссылку другу. Страница <code>/generator</code> не отображается в меню
            розыгрыша.
          </p>
          <p className={styles.warning}>
            Используйте только среди друзей в шуточных целях. Сайт не собирает реальные данные.
          </p>
        </div>
      </main>
    </div>
  );
}
