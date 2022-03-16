import { doc, getDoc } from '@firebase/firestore';
import { db } from '../Firebase';
import { format } from 'date-fns';

const getDayVisits = async (date) => {
  const formattedDate = format(date, 'dd-MM-yy');
  const ref = doc(db, 'analytics/visits', `visits/${formattedDate}`);
  const requestedData = await getDoc(ref);

  if (requestedData.exists()) {
    return requestedData.data();
  } else {
    return { amount: 0, day: format(date, 'dd'), id: formattedDate };
  }
};

export default getDayVisits;
