import { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../Context/CartContext';
import AmountCounter from '../Utils/AmountCounter';
import trashImage from '../../Assets/Images/Icons/trash-solid.svg';
import { desktopMediaQuery } from '../../styles';
import formatPrice from '../../Bin/formatPrice';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0003;
  padding: 1rem 0;
`;

const ImageContainer = styled.div`
  height: 6em;
  width: 6em;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 10px;
  /* padding-top: 1em; */
  /* padding-bottom: 1em; */
`;

const ProductName = styled.h4`
  font-size: 1.2em;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.1em;
  font-weight: 500;
  color: #222;
`;

// const DeleteButtonContainer = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const DeleteButton = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  font-style: normal;
  margin-left: 0.5em;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-top: 5px;
  margin-right: 5px;
  transform: translateY(-3px);
  transition: filter 0.3s;

  &:hover {
    filter: opacity(85%);
  }

  ${desktopMediaQuery} {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 1em;
    transform: translateY(1px);
  }
`;

const DeleteButtonImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

const CartCard = ({ product, amount }) => {
  const { incrementOne, reduceOne, removeFromCart } = useContext(CartContext);

  const handleIncrementProductAmount = () => {
    incrementOne(product.id);
  };

  const handleReduceProductAmount = () => {
    if (amount === 1) return;
    else reduceOne(product.id);
  };

  const handleDeleteProduct = () => {
    removeFromCart(product.id);
  };

  return (
    <CardContainer>
      <ImageContainer>
        <Image src={product.imagesURLs[0]} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <Price>${formatPrice(product.price * amount)}</Price>
        <AmountCounter
          amount={amount}
          incrementFunction={handleIncrementProductAmount}
          decrementFunction={handleReduceProductAmount}
          width="70%"
        />
      </ProductInfo>
      {/* <DeleteButtonContainer> */}
      <DeleteButton onClick={handleDeleteProduct}>
        <DeleteButtonImage src={trashImage} alt="" />
      </DeleteButton>
      {/* </DeleteButtonContainer> */}
    </CardContainer>
  );
};

export default CartCard;
