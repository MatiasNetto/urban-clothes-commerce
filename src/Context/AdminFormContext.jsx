import { createContext, useState, useContext } from 'react';
import addProductService from '../Services/addProductService';
import deleteProductService from '../Services/deleteProductService';
import editProductService from '../Services/editProductService';
// import { ProductsInfoContext } from '../Context/ProductsInfoContext';

const AdminFormContext = createContext();

const AdminFormProvider = ({ children }) => {
  const [adminCategory, setAdminCategory] = useState('vinos');
  const [dataQuestionModal, setDataQuestionModal] = useState({ question: '', callback: () => {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { addData, removeData, replaceData } = useContext(ProductsInfoContext);

  //!####################################################################################################################################!//
  //! La actualizacion del estado no funciona, esto se solucina e  el proxumo commit con la aplicacion de redux como manejador de estado !//
  //!####################################################################################################################################!//

  const openQuestionModal = () => {
    setIsModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsModalOpen(false);
  };

  const addProduct = async (productData) => {
    await addProductService(productData);
    // addData(productData);
  };

  const editProduct = async (newData, oldData) => {
    editProductService(newData, oldData);
    // replaceData(oldData, newData);
  };

  const deleteProduct = async (productData) => {
    deleteProductService(productData);
    // removeData(productData);
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
