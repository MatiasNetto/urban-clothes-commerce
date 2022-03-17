import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../Firebase';

const deleteProductService = async (productData) => {
  //   removeData(`category/${productData.category}`, productData);

  await deleteDoc(doc(db, productData.category, productData.id));

  await productData.imagesPaths.forEach(async (imagePath) => {
    await deleteObject(ref(storage, imagePath));
  });
};

export default deleteProductService;
