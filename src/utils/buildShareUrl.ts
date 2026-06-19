export interface SummonsFormData {
  date: string;
  time: string;
  office: string;
}

export function buildShareUrl(data: SummonsFormData, baseUrl?: string): string {
  const origin = baseUrl ?? window.location.origin;
  const params = new URLSearchParams();
  if (data.date) params.set('date', data.date);
  if (data.time) params.set('time', data.time);
  if (data.office) params.set('office', data.office);
  const query = params.toString();
  const base = import.meta.env.PROD ? '/registry' : '';
  return `${origin}${base}/${query ? `?${query}` : ''}`;
}
