import Tag from '../TagsAndButtons/Tag';
import { memo, useContext } from 'react';
import styled from 'styled-components';
import image from '../../Assets/Images/Provisionales/Hamburger-1.jpeg';
import { desktopMediaQuery } from '../../styles';
import { Link } from 'react-router-dom';
import { ProductsInfoContext } from '../../Context/ProductsInfoContext';
import formatPrice from '../../Bin/formatPrice';
import OfferTag from '../TagsAndButtons/OfferTag';

const CardContainer = styled(Link)`
  min-height: 60vh;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1.5em auto;
  background: #fff;
  box-shadow: 0px 5px 7px #0004;
  text-decoration: none;

  ${desktopMediaQuery} {
    height: 28vh;
    width: 100%;
    margin: 0;
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 80vw;
  position: relative;
  overflow: hidden;
  /* filter: grayscale(1); */
  backdrop-filter: grayscale(1);
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 9;
  object-fit: cover;

  ${({ outOfStock }) => outOfStock && `filter: saturate(0%) brightness(60%);`};
`;

const OutOfStockText = styled.p`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  font-size: 3em;
`;

const CardInfoContainer = styled.div`
  width: 100%;
  padding: 1em 1.3em;
`;

const TagsContainer = styled.div`
  position: absolute;
  left: 0.5em;
  top: 0.5em;
  display: flex;
`;

const Tittle = styled.h5`
  font-size: 1.3em;
  font-weight: 400;
  /* text-align: center; */
  margin: 10px 0;
  color: #000;
`;

const Description = styled.p`
  color: #555;
`;

const PriceContainer = styled.div`
  display: flex;
`;

const Price = styled.p`
  font-size: 1.2em;
  font-weight: 500;
  margin: 10px 0;
  color: #000;
`;

const OverlinedPrice = styled.del`
  /* text-decoration: line-through; */
  font-size: 1.2em;
  font-weight: 200;
  margin: 10px 0;
  margin-right: 0.5em;
  color: #444;
`;

const OfferContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;

const Card = ({ productData }) => {
  const {
    imagesURLs = [image],
    category,
    name = '',
    id,
    description = name,
    price = 0,
    offer = { hasOffer: false, price: '' },
    tags = [],
    outOfStock = false,
  } = productData;
  const { setLastProductVisited } = useContext(ProductsInfoContext);

  const formatDescription = (string) => {
    if (string.length > 50) return string.slice(0, 60).trim() + '...';
    else return string;
  };

  return (
    <CardContainer id={id} to={`/category/${category}/${id}`} onClick={() => setLastProductVisited(id)}>
      {offer.hasOffer && (
        <OfferContainer>
          <OfferTag price={price} offerPrice={offer.price} solid={true} />
        </OfferContainer>
      )}
      <CardImageContainer>
        <CardImage src={imagesURLs[0]} outOfStock={outOfStock} />
        {outOfStock && <OutOfStockText>Sin Stock</OutOfStockText>}
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} tooltipText={tag} />
          ))}
        </TagsContainer>
      </CardImageContainer>
      <CardInfoContainer>
        <Tittle>{name}</Tittle>
        <Description>{formatDescription(description)}</Description>
        <PriceContainer>
          {offer.hasOffer && (
            <>
              <OverlinedPrice>${formatPrice(price)}</OverlinedPrice> <Price>${formatPrice(offer.price, true)}</Price>
            </>
          )}
          {!offer.hasOffer && <Price>${formatPrice(price)}</Price>}
        </PriceContainer>
      </CardInfoContainer>
    </CardContainer>
  );
};

export default memo(Card);
