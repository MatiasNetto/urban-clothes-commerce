import { memo, useContext } from 'react';
import styled from 'styled-components';
import { desktopMediaQuery } from '../../styles';
import { Link } from 'react-router-dom';
import { ProductsInfoContext } from '../../Context/ProductsInfoContext';

const Container = styled.div`
  height: 30vh;
  width: 90%;
  position: relative;
  margin: 10px auto;
  overflow: hidden;

  ${desktopMediaQuery} {
    width: 40%;
    margin: 0 0.5rem;
  }
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -99;
  object-fit: cover;
  background: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  filter: brightness(70%);
  box-shadow: 0 0 30px #000a inset;
`;

const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
`;

const Tittle = styled.h5`
  font-size: 2em;
  color: #fff;
`;

const Button = styled(Link)`
  height: fit-content;
  width: fit-content;
  padding: 10px 15px;
  border: 0 solid transparent;
  background: #fff;
  font-size: 1.3em;
  color: #000;
  box-shadow: 0 3px 15px #0008;
  text-decoration: none;
`;

const CategoryCard1 = ({ category, name, image }) => {
  const { setFilters, setLastProductVisited } = useContext(ProductsInfoContext);

  const handleButtonClick = () => {
    setFilters([]);
    setLastProductVisited(undefined);
  };

  return (
    <Container image={image}>
      <Image image={image} />
      <InfoContainer>
        <Tittle>{name}</Tittle>
        <Button to={`/category/${category}`} onClick={handleButtonClick}>
          Ver {name}
        </Button>
      </InfoContainer>
    </Container>
  );
};

export default memo(CategoryCard1);
