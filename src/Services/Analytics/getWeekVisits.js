import getDayVisits from './getDayVisits';
import { subDays } from 'date-fns';

const getWeekVisits = async () => {
  const today = new Date();
  const numbers = [0, 1, 2, 3, 4, 5, 6];

  //recorre numbers y por cada numero devuelve la info del dia correspondiente a hoy - Numero
  const weekVisits = await Promise.all([...numbers.map((i) => getDayVisits(subDays(today, i)))]);
  return weekVisits;
};

export default getWeekVisits;
