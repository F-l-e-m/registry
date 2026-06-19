export function generateSummonsNumber(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const num = Math.abs(hash) % 900000 + 100000;
  const year = new Date().getFullYear();
  return `${year}-${String(num).padStart(6, '0')}`;
}

export function generateUin(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i) * (i + 1);
    hash |= 0;
  }
  const base = Math.abs(hash).toString().padStart(20, '0').slice(0, 20);
  return `0${base}`;
}

export function generateEpHash(seed: string): string {
  const chars = '0123456789abcdef';
  let hash = seed.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 7), 0);
  let result = '';
  for (let i = 0; i < 64; i++) {
    hash = (hash * 1103515245 + 12345 + i) & 0x7fffffff;
    result += chars[hash % 16];
  }
  return result;
}

export function generateCertSerial(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 3) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(16, '0').slice(0, 16);
}

export function formatRussianDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRussianDateTime(dateStr: string, timeStr: string): string {
  return `${formatRussianDate(dateStr)} в ${timeStr}`;
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getYesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function getRegistryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
}
