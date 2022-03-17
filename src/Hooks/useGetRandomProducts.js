import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, limit } from '@firebase/firestore';
import { db } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction } from '../Context/Actions/ProductsInfoActions';

const defaultErrorValue = { error: false, message: '' };

const useGetRandomProducts = (categorys) => {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(defaultErrorValue);
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.productsInfo.homeProducts);

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

    dispatch(addCategoryAction('homeProducts', productsFragment));
    sendData(productsFragment);
  };

  useEffect(() => {
    if (categorys === undefined || categorys.length === 0) {
      throwError('La categoria buscada esta vacia');
      return;
    }

    if (loading === false) setLoading(true);

    if (savedData) {
      setError(false);
      sendData(savedData);
    } else {
      requestAllProducts();
    }
  }, [categorys, savedData]);

  return { products, loading, error };
};

export default useGetRandomProducts;
