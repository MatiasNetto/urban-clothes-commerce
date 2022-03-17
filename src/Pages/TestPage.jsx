import { useState } from 'react';
import getTopSells from '../Services/Analytics/getTopSells';
import useGetRandomProducts from '../Hooks/useGetRandomProducts';
import formatPrice from '../Bin/formatPrice';
import Loader from '../Components/Utils/Loader';

const TestPage = () => {
  // const text = encodeURI(`Hola como estas\nmi nombre es matias`);
  // getTopSells('vinos').then((res) => console.log(res));

  // console.log(formatPrice(1512));
  // return <>{/* <a href={`https://wa.me/5491145265942?text=${text}`}>Link!</a> */}</>;
  return <Loader />;
};

export default TestPage;
