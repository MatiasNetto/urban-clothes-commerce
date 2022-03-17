import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { format, getMonth } from 'date-fns';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const getMonthVisits = async (monthDate) => {
  const todayFormatted = format(monthDate, 'MM-yy');
  const monthRef = doc(db, 'analytics/visits', `visits/${todayFormatted}`);

  const req = await getDoc(monthRef);

  if (req.exists()) {
    return req.data();
  } else {
    return { amount: 0, id: todayFormatted, monthNumber: getMonth(monthDate) + 1, month: months[getMonth(monthDate)] };
  }
};

export default getMonthVisits;
