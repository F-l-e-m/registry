import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  generateSummonsNumber,
  generateUin,
  generateEpHash,
  generateCertSerial,
  getYesterdayDate,
  getRegistryDate,
} from '../utils/generateIds';
import { getDefaultAppearanceDate } from '../utils/defaults';

export interface SummonsParams {
  name: string;
  birth: string;
  date: string;
  time: string;
  office: string;
  summonsNumber: string;
  uin: string;
  epHash: string;
  certSerial: string;
  signedDate: string;
  registryDate: string;
}

const DEFAULTS = {
  name: 'Гражданин РФ',
  birth: '1995-01-01',
  date: getDefaultAppearanceDate(),
  time: '09:00',
  office: 'Военный комиссариат г. Москвы, ул. Яблочкова, д. 5',
};

export function useSummonsParams(): SummonsParams {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const name = searchParams.get('name') || DEFAULTS.name;
    const birth = searchParams.get('birth') || DEFAULTS.birth;
    const date = searchParams.get('date') || DEFAULTS.date;
    const time = searchParams.get('time') || DEFAULTS.time;
    const office = searchParams.get('office') || DEFAULTS.office;

    const seed = `${name}|${birth}|${date}|${office}`;

    return {
      name,
      birth,
      date,
      time,
      office,
      summonsNumber: generateSummonsNumber(seed),
      uin: generateUin(seed),
      epHash: generateEpHash(seed),
      certSerial: generateCertSerial(seed),
      signedDate: getYesterdayDate(),
      registryDate: getRegistryDate(),
    };
  }, [searchParams]);
}
