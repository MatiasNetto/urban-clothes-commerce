import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const addNewSells = async (products) => {
  await products.forEach(async (el) => {
    const productReference = doc(db, `analytics/visits`, `per-product/${el.product.id}`);
    const requestProductData = await getDoc(productReference);
    if (requestProductData.exists()) {
      let newData = {
        ...requestProductData.data(),
        name: el.product.name,
        category: el.product.category,
        productImage: el.product.imagesURLs[0],
      };
      newData.amount += el.amount; //increment the sells
      await setDoc(productReference, newData);
    } else {
      await setDoc(productReference, {
        amount: el.amount,
        productId: el.product.id,
        category: el.product.category,
        productName: el.product.name,
        productImage: el.product.imagesURLs[0],
      });
    }
  });
  console.log('Ventas registradas');
};

export default addNewSells;
