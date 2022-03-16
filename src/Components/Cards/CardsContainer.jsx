import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ProductsInfoContext } from '../../Context/ProductsInfoContext';

import Card from './Card';
import useGetCategory from '../../Hooks/useGetCategory';
// import { useEffect, useRef } from 'react';
// import usePagination from '../../Hooks/usePagination';
import LazyLoading from '../Utils/LazyLoading';
import sortProducts from '../../Bin/sortProducts';
import Loader from '../Utils/Loader';
import { desktopMediaQuery } from '../../styles';
import filterProducts from '../../Bin/filterProducts';

const Container = styled.div`
  min-height: 92vh;
  width: 100%;
`;

const ProductsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  ${desktopMediaQuery} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 30px;
    padding: 0 5%;
  }
`;

const CardsContainer = ({ category }) => {
  const { filters } = useContext(ProductsInfoContext);
  let { products, loading, error } = useGetCategory(category);

  const sortedProducts = useMemo(() => filterProducts(sortProducts(products), filters), [products, filters]);

  return (
    <Container>
      {error.error && <p>{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <ProductsContainer>
          {sortedProducts.map((productData) => {
            return (
              <LazyLoading key={productData.id}>
                <Card productData={productData} />
              </LazyLoading>
            );
          })}
        </ProductsContainer>
      )}
    </Container>
  );
};

export default CardsContainer;
