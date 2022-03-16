import { db } from '../Firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { format, getMonth } from 'date-fns';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const addNewVisit = async () => {
  const todayFormatted = format(new Date(), 'dd-MM-yy');
  const dayReference = doc(db, `analytics/visits`, `visits/${todayFormatted}`);
  const monthReference = doc(db, `analytics/visits`, `visits/${format(new Date(), 'MM-yy')}`);

  const requestedDayData = await getDoc(dayReference);
  const requestedMonthData = await getDoc(monthReference);

  if (requestedDayData.exists()) {
    //get the actual value and add 1 to amount
    let newData = requestedDayData.data();
    newData.amount = newData.amount + 1;
    await setDoc(dayReference, newData);
  } else {
    //create the new reference
    await setDoc(dayReference, { amount: 1, day: format(new Date(), 'dd'), id: todayFormatted });
  }

  if (requestedMonthData.exists()) {
    let newData = requestedMonthData.data();
    newData.amount = newData.amount + 1;
    await setDoc(monthReference, newData);
  } else {
    await setDoc(monthReference, {
      amount: 1,
      monthNumber: getMonth(new Date()) + 1,
      month: months[getMonth(new Date())],
      id: format(new Date(), 'MM-yy'),
    });
  }

  console.log('Welcome!');
};

export default addNewVisit;
