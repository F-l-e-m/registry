export interface SummonsFormData {
  name: string;
  birth: string;
  date: string;
  time: string;
  office: string;
}

export function buildShareUrl(data: SummonsFormData, baseUrl?: string): string {
  const origin = baseUrl ?? window.location.origin;
  const params = new URLSearchParams();
  if (data.name) params.set('name', data.name);
  if (data.birth) params.set('birth', data.birth);
  if (data.date) params.set('date', data.date);
  if (data.time) params.set('time', data.time);
  if (data.office) params.set('office', data.office);
  return `${origin}/?${params.toString()}`;
}
