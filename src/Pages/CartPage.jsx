import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartCardsContainer from '../Components/Cart/CartCardsContainer';
import { CartContext } from '../Context/CartContext';
import styled from 'styled-components';
import genQuerySearch from '../Bin/genQuerySearch';
import { desktopMediaQuery } from '../styles';
import formatPrice from '../Bin/formatPrice';
import addNewSells from '../Analytics/addNewSells';
import ErrorText from '../Components/Utils/ErrorText';

const CartPageContainer = styled.div`
  ${desktopMediaQuery} {
    display: flex;
    justify-content: space-around;
    margin-top: 5vh;
    padding: 0 10vw;
  }
`;

const DataContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 1rem;
  margin: 0 auto;
  background: #fff;
  ${desktopMediaQuery} {
    width: 45%;
  }
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 400;
  padding: 1rem 1.5rem;
  color: #222;
`;

const ConstInfoAndButtonContainer = styled.div`
  ${desktopMediaQuery} {
    /* width: 35%; */
  }
`;

const InfoDisplay = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5em;
  /* border-top: 1px solid #0003; */
  border-bottom: 1px solid #0003;

  ${desktopMediaQuery} {
    font-size: 1.25rem;
  }
`;

const BuyButton = styled.button`
  width: 90%;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1em;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  background: #dd6b20;
  font-size: 1em;
  color: #fff;
  padding: 0;
  border: none;
  cursor: pointer;
  text-decoration: none;

  ${desktopMediaQuery} {
    position: relative;
    margin-top: 10vh;
  }
`;

const BuyButtonText = styled.span`
  font-size: 1.2em;
`;

const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const calcTotalPrice = () => {
    let total = 0;
    cartProducts.forEach((el) => {
      total = Number(total) + Number(el.product.price) * Number(el.amount);
    });
    return formatPrice(total);
  };

  const calcProductsAmount = () => {
    let total = 0;
    cartProducts.forEach((el) => {
      total = Number(total) + Number(el.amount);
    });
    return total;
  };

  const handleBuyButtonClick = () => {
    const querySearch = genQuerySearch(cartProducts);
    addNewSells(cartProducts);
    history.push(`/checkout?${querySearch}`);
  };

  if (cartProducts.length === 0) return <ErrorText goBack={true} message="El carrito de copras esta vacio" />;

  return (
    <CartPageContainer>
      <Title>Tu pedido ({calcProductsAmount()})</Title>
      <DataContainer>
        <CartCardsContainer cartProducts={cartProducts} />
        <ConstInfoAndButtonContainer>
          <InfoDisplay>
            <p>Total</p>
            <p>${calcTotalPrice()}</p>
          </InfoDisplay>
          <BuyButton onClick={handleBuyButtonClick}>
            <BuyButtonText>Siguiente</BuyButtonText>
          </BuyButton>
        </ConstInfoAndButtonContainer>
      </DataContainer>
    </CartPageContainer>
  );
};

export default CartPage;
