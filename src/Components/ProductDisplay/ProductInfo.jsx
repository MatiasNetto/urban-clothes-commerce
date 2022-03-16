import styled from 'styled-components';
import { desktopMediaQuery } from '../../styles';

const MainContainer = styled.div`
  height: 12vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const TextContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.5em;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const Tittle = styled.h6`
  font-size: 1.1em;
  margin-bottom: 5px;

  ${desktopMediaQuery} {
    font-size: 1.5em;
  }
`;
const Description = styled.p`
  color: #555;
  font-size: 0.9em;

  ${desktopMediaQuery} {
    font-size: 1.1em;
  }
`;

const ProductInfo = ({ title, description, imageURL }) => {
  return (
    <MainContainer>
      <ImageContainer>
        <Image src={imageURL} />
      </ImageContainer>
      <TextContainer>
        <Tittle>{title}</Tittle>
        <Description>{description}</Description>
      </TextContainer>
    </MainContainer>
  );
};

export default ProductInfo;
