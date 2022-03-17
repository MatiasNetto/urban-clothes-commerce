import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../Firebase';

const deleteProductService = async (productData) => {
  //   removeData(`category/${productData.category}`, productData);

  const promises = [
    deleteDoc(doc(db, productData.category, productData.id)), //Delete product
    productData.imagesPaths.map((imagePath) => deleteObject(ref(storage, imagePath))), //delete product images (map the images and return delte fn)
    deleteDoc(doc(db, `analytics/visits`, `per-product/${productData.category}-${productData.id}`)), //delete analytics
  ];

  await Promise.all(promises);
};

export default deleteProductService;
