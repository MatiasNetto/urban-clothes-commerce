import { subMonths } from 'date-fns';
import getMonthVisits from './getMonthVisits';

const getLastFiveMonths = async () => {
  const today = new Date();
  const numbers = [0, 1, 2, 3, 4];

  //recorre numbers y por cada numero devuelve la info del dia correspondiente a hoy - Numero
  const weekVisits = await Promise.all([...numbers.map((i) => getMonthVisits(subMonths(today, i)))]);
  return weekVisits;
};

export default getLastFiveMonths;
