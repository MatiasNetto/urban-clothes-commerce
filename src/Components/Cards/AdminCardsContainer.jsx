import { memo, useMemo, useContext } from 'react';
import { AdminFormContext } from '../../Context/AdminFormContext';
import styled from 'styled-components';
import sortProducts from '../../Bin/sortProducts';
import useGetCategory from '../../Hooks/useGetCategory';
import LazyLoading from '../Utils/LazyLoading';
import AdminCard from './AdminCard';
import Loader from '../Utils/Loader';
import { desktopMediaQuery } from '../../styles';

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

const Space = styled.div`
  height: 3em;
`;

const AdminCardsContainer = () => {
  const { adminCategory } = useContext(AdminFormContext);
  let { products, loading, error } = useGetCategory(adminCategory);

  const sortedProducts = useMemo(() => sortProducts(products), [products]);

  return (
    <Container>
      {error.error && <p>{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <ProductsContainer>
          {sortedProducts.map((productData, index) => {
            return (
              <LazyLoading key={productData.id + index}>
                <AdminCard productData={productData} />
              </LazyLoading>
            );
          })}
        </ProductsContainer>
      )}
      <Space />
    </Container>
  );
};

export default memo(AdminCardsContainer);
