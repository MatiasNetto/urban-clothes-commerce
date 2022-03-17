import { setDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';

const addProductService = async (productData) => {
  let d = productData;
  if (d.id !== '' && d.order !== '' && d.name !== '' && d.description !== '' && d.price !== '') {
    return await setDoc(doc(db, productData.category, productData.id), productData);
  } else {
    alert('Complete todos los campos');
  }
};

export default addProductService;
