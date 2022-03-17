import { setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const editProductService = async (newData, oldData) => {
  //   const oldDataID = `category/${oldData.category}`;
  //   const newDataID = `category/${newData.category}`;
  //   replaceData(oldDataID, oldData, newDataID, newData);

  const productSellsAnalytics = await getDoc(
    doc(db, `analytics/visits`, `per-product/${oldData.category}-${oldData.id}`)
  );

  const promises = [
    deleteDoc(doc(db, `analytics/visits`, `per-product/${oldData.category}-${oldData.id}`)),
    deleteDoc(doc(db, oldData.category, oldData.id)),
    setDoc(doc(db, newData.category, newData.id), newData),
  ];

  if (productSellsAnalytics.data())
    promises.push(
      setDoc(doc(db, `analytics/visits`, `per-product/${newData.category}-${newData.id}`), productSellsAnalytics.data())
    );

  const res = await Promise.all(promises);
  return res[2];
};

export default editProductService;
