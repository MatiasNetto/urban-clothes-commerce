import styled from 'styled-components';
import { desktopMediaQuery } from '../../styles';
import CartCard from './CartCard';

const ProductsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-top: 1em; */

  /* ${desktopMediaQuery} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 30px;
    padding: 0 5%;
  } */
`;

const CartCardsContainer = ({ cartProducts }) => {
  return (
    <ProductsContainer>
      {cartProducts.map((el) => (
        <CartCard key={el.product.id} product={el.product} amount={el.amount} />
      ))}
    </ProductsContainer>
  );
};

export default CartCardsContainer;
