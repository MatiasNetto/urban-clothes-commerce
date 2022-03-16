import { useContext, useEffect, useState } from 'react';
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../Firebase';
import { ProductsInfoContext } from '../Context/ProductsInfoContext';

const defaultErrorValue = { error: false, message: '' };

const useGetProduct = (category, productId) => {
  const [product, setProduct] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(defaultErrorValue);
  const { getStoredData, storedData } = useContext(ProductsInfoContext);

  const throwError = (message) => {
    //Return an error
    setError({ error: true, message: message });
    setProduct([]);
    setLoading(false);
  };

  const sendData = (data) => {
    //Return the data
    setProduct(data);
    setError();
    setLoading(false);
  };

  const requestProduct = () => {
    //Fetch the data and return it, if there is an error return the error
    getDoc(doc(db, `${category}/${productId}`))
      .then((doc) => {
        if (!doc.exists()) throwError('El producto solicitado no existe o fue eliminado');
        else {
          // storageData(`category/${category}/${productId}`, doc.data());
          sendData(doc.data());
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

    const savedData = getStoredData(`category/${category}`)?.find((el) => el.id === productId);

    if (savedData !== undefined) {
      setError(false);
      sendData(savedData);
    } else {
      requestProduct();
    }
  }, [category, storedData]);

  return { product, loading, error };
};

export default useGetProduct;
