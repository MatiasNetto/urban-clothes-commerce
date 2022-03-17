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

  const removeData = (dataID, dataToDelete) => {
    if (Object.keys(storedData).length === 0) return;
    // console.log({ dataToDelete, storedData: storedData[dataID][0] });
    const filteredData = storedData[dataID].filter((e) => e !== dataToDelete);
    setStoredData({ ...storedData, [dataID]: filteredData });
  };

  const replaceData = (oldDataID, oldData, newDataID, newData) => {
    if (Object.keys(storedData).length === 0) return;
    const filteredOldData = storedData[oldDataID].filter((e) => e.id !== oldData.id);

    if (oldDataID === newDataID) {
      setStoredData({ ...storedData, [oldDataID]: [...filteredOldData, newData] });
    } else {
      setStoredData({ ...storedData, [oldDataID]: filteredOldData, [newDataID]: [...storedData[newDataID], newData] });
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
