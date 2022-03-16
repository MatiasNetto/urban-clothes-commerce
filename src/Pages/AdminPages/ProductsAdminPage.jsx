import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AdminCardsContainer from '../../Components/Cards/AdminCardsContainer';
import { AdminFormContext } from '../../Context/AdminFormContext';
import QuestionModal from '../../Components/Admin/Form/QuestionModal';
import { desktopMediaQuery } from '../../styles';
import useAuth from '../../auth/useAuth';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const TopFormBar = styled.div`
  width: fit-content;
  height: 10vh;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-left: 4vw;

  ${desktopMediaQuery} {
    width: 100%;
    padding: 0 6%;
  }
`;

const TopFormBarText = styled.p`
  font-size: 1.3em;
`;

const Button = styled(Link)`
  height: fit-content;
  width: fit-content;
  position: fixed;
  right: 1em;
  bottom: 1rem;
  z-index: 9999;
  padding: 10px 20px;
  font-size: 1.1em;
  background: #fed610;
  box-shadow: 0px 5px 5px #0004;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: #000;

  &:hover {
    filter: brightness(90%);
  }

  ${desktopMediaQuery} {
    position: absolute;
    right: 12vh;
    z-index: 1;
  }
`;

const CategorySelect = styled.select`
  width: fit-content;
  height: fit-content;
  margin-left: 10px;
  font-size: 1.5em;
  background: transparent;
  border: none;
  border-bottom: 2px solid #000;
  cursor: pointer;
  outline: none;
`;

const ProductsContainer = styled.div`
  width: 98%;
  margin: 0 auto;
`;

const ProductsAdminPage = () => {
  const { adminCategory, setAdminCategory, isModalOpen } = useContext(AdminFormContext);
  const { setAdminMenu } = useAuth();

  useEffect(() => {
    setAdminMenu(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [setAdminMenu]);

  const handleCategoryChange = (e) => {
    setAdminCategory(e.target.value);
  };

  return (
    <>
      <Container>
        <TopFormBar>
          <TopFormBarText>Category: </TopFormBarText>
          <CategorySelect onChange={handleCategoryChange} value={adminCategory} name="category">
            <option value="vinos">Vinos</option>
            <option value="vodka">Vodka</option>
            <option value="espumantes">Espumantes</option>
          </CategorySelect>

          <Button to="/dashboard/products/add">+ ADD PRODUCT</Button>
        </TopFormBar>

        <ProductsContainer>
          <AdminCardsContainer />
        </ProductsContainer>
      </Container>
      {isModalOpen && <QuestionModal />}
    </>
  );
};

export default ProductsAdminPage;
