import { setDoc, doc } from '@firebase/firestore';
import { db } from '../Firebase';

const uploadNewProduct = (category, productData) => {
  setDoc(doc(db, category, productData.id), productData);
};

export default uploadNewProduct;
