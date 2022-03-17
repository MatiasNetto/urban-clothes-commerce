import { useState, useEffect } from 'react';
import getTopSells from '../Services/Analytics/getTopSells';

const defaultErrorValue = { error: false, message: '' };

const useGetProductSells = (category) => {
  const [productSells, setProductSells] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(defaultErrorValue);

  const throwError = (message) => {
    //Return an error
    setError({ error: true, message: message });
    setProductSells([]);
    setLoading(false);
  };

  const sendData = (data) => {
    //Return the data
    setProductSells(data);
    setError({ error: false });
    setLoading(false);
  };

  const getProducts = async (category) => {
    console.log(`Requeting analytics for product ${category}`);
    const data = await getTopSells(category);
    if (typeof data !== 'object' || data.length === 0) {
      throwError('Unable to find products');
    } else {
      sendData(data);
    }
  };

  useEffect(() => {
    if (loading === false) setLoading(true);
    getProducts(category);
  }, [category]);

  return { productSells, loading, error };
};

export default useGetProductSells;
