import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ProductsInfoContext } from '../../Context/ProductsInfoContext';
import useGetRandomProducts from '../../Hooks/useGetRandomProducts';

import Card from '../ProductCards/Card';
import LazyLoading from '../Utils/LazyLoading';
import sortProducts from '../../Services/sortProducts';
import Loader from '../Utils/Loader';
import { desktopMediaQuery } from '../../styles';
import filterProducts from '../../Services/filterProducts';

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

const HomeCardsContainer = () => {
  const { filters } = useContext(ProductsInfoContext);
  let { products, loading, error } = useGetRandomProducts(['vinos', 'vodka', 'espumantes']);

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

export default HomeCardsContainer;
