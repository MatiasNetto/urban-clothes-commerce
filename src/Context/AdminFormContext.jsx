import { createContext, useState } from 'react';

const AdminFormContext = createContext();

const AdminFormProvider = ({ children }) => {
  const [adminCategory, setAdminCategory] = useState('vinos');
  const [dataQuestionModal, setDataQuestionModal] = useState({ question: '', callback: () => {} });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openQuestionModal = () => {
    setIsModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminFormContext.Provider
      value={{
        isModalOpen,
        openQuestionModal,
        closeQuestionModal,
        dataQuestionModal,
        setDataQuestionModal,
        adminCategory,
        setAdminCategory,
      }}
    >
      {children}
    </AdminFormContext.Provider>
  );
};

export { AdminFormContext, AdminFormProvider };
