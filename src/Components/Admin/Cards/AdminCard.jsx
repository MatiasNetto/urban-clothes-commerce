import Tag from './../../ProductCards/Tag';
import { memo, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { colorGreen, colorRed } from '../../../styles';
import image from '../../../Assets/Images/Provisionales/Hamburger-1.jpeg';
import { AdminFormContext } from '../../../Context/AdminFormContext';
import { desktopMediaQuery } from '../../../styles.js';
import formatPrice from '../../../Services/formatPrice';
import { Link } from 'react-router-dom';
import OfferTag from '../../Utils/OfferTag';

const CardContainer = styled.div`
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

  ${desktopMediaQuery} {
    height: 28vh;
    width: 100%;
    margin: 0;
  }
`;

const BackgroundAnimation = keyframes`
  0% {
    background: #ddd;
      }

  100% {
    background: #fafafa;
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 80vw;
  position: relative;
  overflow: hidden;
  ::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 2em;

    animation-name: ${BackgroundAnimation};
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
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
  /* text-align: center; */
  margin: 10px 0;
`;

const Description = styled.p`
  color: #555;
`;

const PriceContainer = styled.div`
  display: flex;
`;

const Price = styled.p`
  font-size: 1.2em;
  font-weight: 700;
  margin: 10px 0;
`;

const OverlinedPrice = styled.del`
  /* text-decoration: line-through; */
  font-size: 1.2em;
  font-weight: 200;
  margin: 10px 0;
  margin-right: 0.5em;
  color: #444;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 1em;
`;

const DeleteButton = styled.button`
  width: 40%;
  font-size: 1.4em;
  padding: 10px 15px;
  background: ${colorRed};
  border: none;
  border-radius: 3px;
  color: #fff;
`;

const EditButton = styled(Link)`
  width: 40%;
  font-size: 1.4em;
  padding: 10px 15px;
  background: ${colorGreen};
  border: none;
  border-radius: 3px;
  text-align: center;
  text-decoration: none;
  color: #fff;
`;

const OfferContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;

const AdminCard = ({ productData }) => {
  const {
    imagesURLs = [image],
    name = '',
    description = name,
    price = 0,
    offer = { hasOffer: false, price: 0 },
    tags = [],
    outOfStock = false,
  } = productData;
  const { openQuestionModal, setDataQuestionModal, deleteProduct } = useContext(AdminFormContext);

  const genQueryParams = () => {
    const productDataString = JSON.stringify(productData);
    const query = new URLSearchParams({ productData: productDataString });
    return query.toString();
  };

  const handleClickDelete = () => {
    setDataQuestionModal({
      question: `Estas seguro que deseas eliminar "${productData.name}"`,
      callback: () => {
        deleteProduct(productData);
      },
    });
    openQuestionModal();
  };

  return (
    <CardContainer>
      <CardImageContainer>
        <CardImage src={imagesURLs[0]} outOfStock={outOfStock} />
        {outOfStock && <OutOfStockText>Sin Stock</OutOfStockText>}
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} tooltipText={tag} />
          ))}
        </TagsContainer>

        {offer.hasOffer && (
          <OfferContainer>
            <OfferTag price={price} offerPrice={offer.price} solid={true} />
          </OfferContainer>
        )}
      </CardImageContainer>
      <CardInfoContainer>
        <Tittle>{name}</Tittle>
        <Description>{description}</Description>
        <PriceContainer>
          {offer.hasOffer && (
            <>
              <OverlinedPrice>${formatPrice(price)}</OverlinedPrice> <Price>${formatPrice(offer.price, true)}</Price>
            </>
          )}
          {!offer.hasOffer && <Price>${formatPrice(price)}</Price>}
        </PriceContainer>
      </CardInfoContainer>
      <ButtonsContainer>
        <EditButton to={`/dashboard/products/edit?${genQueryParams()}`}>Edit</EditButton>
        <DeleteButton onClick={handleClickDelete}>Delete</DeleteButton>
      </ButtonsContainer>
    </CardContainer>
  );
};

export default memo(AdminCard);
