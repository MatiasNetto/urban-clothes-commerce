import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';
// import ProductImagesSlider from '../Components/ProductDisplay/ProductImagesSlider';
// import ProductInfo from '../Components/ProductDisplay/ProductInfo';
import AmountCounter from '../Components/Utils/AmountCounter';
import Loader from '../Components/Utils/Loader';
import OfferTag from '../Components/TagsAndButtons/OfferTag';
import { CartContext } from '../Context/CartContext';
import useGetProduct from '../Hooks/useGetProduct';
import formatPrice from '../Bin/formatPrice';
import { desktopMediaQuery } from '../styles';

const MainContainer = styled.div`
  width: 90%;
  height: auto;
  margin: 0 auto;

  padding-bottom: 1em;

  ${desktopMediaQuery} {
    width: 100%;
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SliderContainer = styled.div`
  height: 50vh;
  width: 100%;
  margin: 1em auto;

  ${desktopMediaQuery} {
    width: 28%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 1em;
  }
`;

const SliderImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;

  ${desktopMediaQuery} {
    width: 28%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5vh 0;
    margin-left: 2em;
  }
`;

const ProductTittle = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  margin: 1rem 0 0.8rem 0;
  color: #111;

  ${desktopMediaQuery} {
    font-size: 2.3em;
  }
`;

const PriceContainer = styled.div`
  display: flex;
`;

const Price = styled.p`
  font-size: 1.5em;
  font-weight: 500;
  color: #111;

  ${desktopMediaQuery} {
    font-size: 1.8em;
  }
`;

const OverlinedPrice = styled.del`
  font-size: 1.5em;
  font-weight: 300;
  color: #444;
  margin-right: 0.6rem;

  ${desktopMediaQuery} {
    font-size: 1.8em;
  }
`;

const Subtittle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;

  ${desktopMediaQuery} {
    font-size: 1.3em;
  }
`;

const Description = styled.div`
  margin-top: 0.4em;
  color: #666;

  ${desktopMediaQuery} {
    font-size: 1.2em;
  }
`;

const HalfSeparator = styled.hr`
  width: 10%;
  margin: 1em 0 1em 0;
`;

// const FullSeparator = styled.hr`
//   margin: 1.5em 0 1em 0;
// `;

const animationButtonOrangeApear = keyframes`
  0%{
    transform: scale(100%);
  }
  50% {
    transform: scale(90%);
  }
  100% {
    background: #dd6b20;
  }

`;

const Button = styled.button`
  display: block;
  width: 100%;
  font-size: 1.5em;
  padding: 0.5em 0;
  margin-top: 1em;
  background: #dd6b20;
  border: 0 solid transparent;
  border-radius: 0;
  box-shadow: 0 2px 5px #0006;
  text-align: center;
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  transition: background 0.3s;
  animation: ${animationButtonOrangeApear} 0.3s;

  &:hover {
    background: #00ce69;
  }
`;

const animationButtonGreenApear = keyframes`
  0%{
    background: #dd6b20;
    transform: scale(100%);
  }
  50% {
    transform: scale(90%);
  }
  100% {
    background: #3fd524;
  }

`;

const ButtonAddedToCart = styled(Button)`
  background: #3fd524;
  animation: ${animationButtonGreenApear} 0.3s;
`;

const OutOfStockButton = styled(Button)`
  animation: none;
  background: #888;
  &:hover {
    background: #666;
  }
`;

const ProductPage = () => {
  const { category, productId } = useParams();
  const { product, loading, error = { error: false } } = useGetProduct(category, productId);
  const { addToCart } = useContext(CartContext);
  const [amount, setAmount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (product !== undefined) {
    if (product.outOfStock === undefined) product.outOfStock = false;
  }

  const handleAddToCart = () => {
    addToCart(product, amount);
    setAddedToCart(true);
  };

  const incrementAmount = () => {
    setAmount((value) => value + 1);
  };

  const decrementAmount = () => {
    if (amount === 1) return;
    setAmount((value) => value - 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setAddedToCart(false);
  }, [amount]);

  if (error.error) return <p>{error.message}</p>;

  if (loading) return <Loader />;

  return (
    <>
      <MainContainer>
        <SliderContainer>
          <SliderImage src={product.imagesURLs} alt={product.name} />
        </SliderContainer>
        <InfoContainer>
          <ProductTittle>{product.name}</ProductTittle>
          <PriceContainer>
            {/* Price */}
            {product.offer.hasOffer && (
              <>
                <OverlinedPrice>${formatPrice(product.price, true)}</OverlinedPrice>{' '}
                <Price>${formatPrice(product.offer.price, true)}</Price>
                <OfferTag price={product.price} offerPrice={product.offer.price} />
              </>
            )}
            {!product.offer.hasOffer && <Price>${formatPrice(product.price, true)}</Price>}
          </PriceContainer>

          <HalfSeparator />
          <Subtittle>Descripcion:</Subtittle>
          <Description>
            {product.description.split('\n').map((el, i) => {
              return el ? <p key={i}>{el}</p> : <br key={i} />;
            })}
          </Description>
          <AmountCounter amount={amount} incrementFunction={incrementAmount} decrementFunction={decrementAmount} />
          {product.outOfStock ? (
            <OutOfStockButton>Sin Stock</OutOfStockButton>
          ) : addedToCart ? (
            <ButtonAddedToCart>Agregado! 👍</ButtonAddedToCart>
          ) : (
            <Button onClick={handleAddToCart}>Agregar al carrito</Button>
          )}
          {/* <FullSeparator />
            <ProductInfo
              title="3 cuotas sin interes"
              description="Tienes disponible hasta 3 cuotas sin interes"
              imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_56404.png&f=1&nofb=1"
            />
            <ProductInfo
              title="Envios a todo el pais"
              description="Hacemos envios por correo argentino a cualquier parte del pais!"
              imageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2015%2F12%2F11%2F685720_transportation_512x512.png&f=1&nofb=1"
            /> */}
        </InfoContainer>
      </MainContainer>
    </>
  );
};

export default ProductPage;
