import { createContext, useState } from 'react';
const ProductsInfoContext = createContext();

const ProductsInfoProvider = ({ children }) => {
  const [storedData, setStoredData] = useState({});
  const [lastProductVisited, setLastProductVisited] = useState(undefined);
  const [filters, setFilters] = useState([]);

  const storageData = (dataID, newData) => {
    setStoredData({ ...storedData, [dataID]: newData });
  };

  const addData = (dataID, newData) => {
    if (Object.keys(storedData).length === 0) return;
    else setStoredData({ ...storedData, [dataID]: [...storedData[dataID], newData] });
  };

  const removeData = (dataToDelete) => {
    if (Object.keys(storedData).length === 0) return;
    // console.log({ dataToDelete, storedData: storedData[dataID][0] });
    const filteredData = storedData[dataToDelete.id].filter((e) => e !== dataToDelete);
    setStoredData({ ...storedData, [dataToDelete.id]: filteredData });
  };

  const replaceData = (oldData, newData) => {
    if (Object.keys(storedData).length === 0) return;
    const filteredOldData = storedData[oldData.id].filter((e) => e.id !== oldData.id);

    if (oldData.id === newData.id) {
      setStoredData({ ...storedData, [oldData.id]: [...filteredOldData, newData] });
    } else {
      setStoredData({
        ...storedData,
        [oldData.id]: filteredOldData,
        [newData.id]: [...storedData[newData.id], newData],
      });
    }
  };

  const getStoredData = (dataID) => {
    return storedData[dataID];
  };

  return (
    <ProductsInfoContext.Provider
      value={{
        storageData,
        storedData,
        addData,
        getStoredData,
        removeData,
        replaceData,
        filters,
        setFilters,
        lastProductVisited,
        setLastProductVisited,
      }}
    >
      {children}
    </ProductsInfoContext.Provider>
  );
};

export { ProductsInfoContext, ProductsInfoProvider };
