import { createContext, useContext, useState } from 'react';
import { setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../Firebase';
import { ProductsInfoContext } from './ProductsInfoContext';

const AdminFormContext = createContext();

const AdminFormProvider = ({ children }) => {
  const [adminCategory, setAdminCategory] = useState('vinos');
  const [dataQuestionModal, setDataQuestionModal] = useState({ question: '', callback: () => {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addData, removeData, replaceData } = useContext(ProductsInfoContext);

  const openQuestionModal = () => {
    setIsModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsModalOpen(false);
  };

  const addProduct = async (productData) => {
    let d = productData;
    if (d.id !== '' && d.order !== '' && d.name !== '' && d.description !== '' && d.price !== '') {
      await setDoc(doc(db, productData.category, productData.id), productData);

      addData(`category/${productData.category}`, productData);
    } else {
      alert('Complete todos los campos');
    }
  };

  const editProduct = async (newData, oldData) => {
    const oldDataID = `category/${oldData.category}`;
    const newDataID = `category/${newData.category}`;

    replaceData(oldDataID, oldData, newDataID, newData);

    const productSellsAnalytics = await getDoc(doc(db, `analytics/visits`, `per-product/${oldData.id}`));

    const promises = [
      deleteDoc(doc(db, `analytics/visits`, `per-product/${oldData.id}`)),
      deleteDoc(doc(db, oldData.category, oldData.id)),
      setDoc(doc(db, newData.category, newData.id), newData),
    ];

    if (productSellsAnalytics.data())
      promises.push(setDoc(doc(db, `analytics/visits`, `per-product/${newData.id}`), productSellsAnalytics.data()));

    await Promise.all(promises);
  };

  const deleteProduct = async (productData) => {
    removeData(`category/${productData.category}`, productData);
    await deleteDoc(doc(db, productData.category, productData.id));
    await productData.imagesPaths.forEach(async (imagePath) => {
      await deleteObject(ref(storage, imagePath));
    });
  };

  return (
    <AdminFormContext.Provider
      value={{
        isModalOpen,
        openQuestionModal,
        closeQuestionModal,
        dataQuestionModal,
        setDataQuestionModal,
        editProduct,
        addProduct,
        deleteProduct,
        adminCategory,
        setAdminCategory,
      }}
    >
      {children}
    </AdminFormContext.Provider>
  );
};

export { AdminFormContext, AdminFormProvider };
