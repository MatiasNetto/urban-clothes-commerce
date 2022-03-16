import { useContext, useEffect, useState } from 'react';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../Firebase';
import { ProductsInfoContext } from '../Context/ProductsInfoContext';

const defaultErrorValue = { error: false, message: '' };

const useGetCategory = (category) => {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(defaultErrorValue);
  const { storageData, getStoredData, storedData } = useContext(ProductsInfoContext);

  const throwError = (message) => {
    //Return an error
    setError({ error: true, message: message });
    setProducts([]);
    setLoading(false);
  };

  const sendData = (data) => {
    //Return the data
    setProducts(data);
    setLoading(false);
  };

  const requestCollection = () => {
    //Fetch the data and return it, if there is an error return the error
    let dataFragment = [];
    getDocs(collection(db, category))
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          dataFragment.push(doc.data());
        });

        if (snapshot.empty.valueOf()) throwError('La categoria solicitada no existe o fue eliminada');
        else {
          storageData(`category/${category}`, dataFragment);
          sendData(dataFragment);
        }
      })
      .catch((e) => {
        console.log(e);
        throwError(JSON.stringify(e));
      });
  };

  useEffect(() => {
    if (category === undefined) {
      throwError('La categoria buscada esta vacia');
      return;
    }

    if (loading === false) setLoading(true);

    const savedData = getStoredData(`category/${category}`);

    if (savedData !== undefined) {
      setError(false);
      sendData(savedData);
    } else {
      requestCollection();
    }
  }, [category, storedData]);

  return { products, loading, error };
};

export default useGetCategory;
