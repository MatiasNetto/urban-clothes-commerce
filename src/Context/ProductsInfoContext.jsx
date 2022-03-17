import { createContext, useState } from 'react';
const ProductsInfoContext = createContext();

const ProductsInfoProvider = ({ children }) => {
  const [lastProductVisited, setLastProductVisited] = useState(undefined);
  const [filters, setFilters] = useState([]);

  return (
    <ProductsInfoContext.Provider
      value={{
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
