import { useContext, useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, limit } from '@firebase/firestore';
import { db } from '../Firebase';
import { ProductsInfoContext } from '../Context/ProductsInfoContext';

const defaultErrorValue = { error: false, message: '' };

const useGetRandomProducts = (categorys) => {
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

  const requestAllProducts = async () => {
    let productsFragment = [];
    //create promises array
    const promises = categorys.map((category) =>
      getDocs(query(collection(db, category), orderBy('order', 'desc'), limit(5)))
    );

    //request all promises
    const promisesResult = await Promise.all([...promises]);
    promisesResult.forEach((docs) => {
      docs.forEach((doc) => {
        productsFragment.push(doc.data());
      });
    });

    //sort and filter the products
    productsFragment = productsFragment.filter((el) => el.outOfStock === false);
    // productsFragment.sort((a, b) => Number(a.order) > Number(b.order));

    storageData('homeProducts', productsFragment);
    sendData(productsFragment);
  };

  useEffect(() => {
    if (categorys === undefined || categorys.length === 0) {
      throwError('La categoria buscada esta vacia');
      return;
    }

    if (loading === false) setLoading(true);

    const savedData = getStoredData(`homeProducts`);

    if (savedData !== undefined) {
      setError(false);
      sendData(savedData);
    } else {
      requestAllProducts();
    }
  }, [categorys, storedData]);

  return { products, loading, error };
};

export default useGetRandomProducts;
