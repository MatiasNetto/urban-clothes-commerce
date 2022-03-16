import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { ProductsInfoContext } from '../../Context/ProductsInfoContext';
import { desktopMediaQuery } from '../../styles';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 5px;
  display: flex;
  justify-content: end;

  ${desktopMediaQuery} {
    justify-content: start;
    padding-bottom: 1.3em;
  }
`;

const Button = styled.button`
  padding: 0.5em 0.8em;
  border: 1px solid #000;
  background: transparent;
  transition: background 0.3s;

  &:hover {
    background: #eee;
  }

  ${desktopMediaQuery} {
    font-size: 1.1em;
    cursor: pointer;
  }
`;

const ButtonText = styled.span`
  padding-right: 5px;
  font-size: 1.1em;
`;

const ModalContainerApear = keyframes`
    0% {
        transform: translateY(3em);
        opacity: 0;
    }    
    100% {
        transform: translateY(0em);
        opacity: 100%;
    }
`;

const ModalContainerDissapear = keyframes`
    0% {
        transform: translateY(0em);
        opacity: 100%;
    }
    100% {
        transform: translateY(3em);
        opacity: 0;
    }
`;

const ModalDesktopContainerApear = keyframes`
    0% {
        transform: translateX(-6em);
        opacity: 0;
    }    
    100% {
        transform: translateX(0em);
        opacity: 100%;
    }
`;

const ModalDesktopContainerDissapear = keyframes`
    0% {
        transform: translateX(0em);
        opacity: 100%;
    }
    100% {
        transform: translateX(-6em);
        opacity: 0;
    }
`;

const ModalContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 99999;
  background: #fff;
  padding-bottom: 15%;
  animation: ${({ isVisible }) => (isVisible ? ModalContainerApear : ModalContainerDissapear)} 0.3s;

  ${desktopMediaQuery} {
    width: 25%;
    box-shadow: 2px 0 10px #0003;
    animation: ${({ isVisible }) => (isVisible ? ModalDesktopContainerApear : ModalDesktopContainerDissapear)} 0.3s;
  }
`;

const CloseButton = styled.button`
  height: 3.3em;
  width: 3.3em;
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const HamburgerLinesClose = styled.div`
  &::before,
  &::after {
    content: '';
    display: inline-block;
    height: 4px;
    width: 100%;
    position: absolute;
    left: 0;
    background-color: #000;
    border-radius: 100px;
  }
  &::after {
    transform: translateY(0) translateX(20px) rotate(45deg);
  }
  &::before {
    transform: translateY(0) translateX(20px) rotate(-45deg);
  }

  transform: translateX(-20px);
`;

const FilterItem = styled.div`
  height: 15%;
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.3em;
`;

const FilterItemText = styled.p`
  color: #333;
  font-size: 1.3em;
`;

const FilterCheckbox = styled.input`
  height: 2em;
  width: 2em;
`;

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { filters, setFilters } = useContext(ProductsInfoContext);

  //   const toggleIsOpen = () => {
  //     setIsOpen((value) => !value);
  //   };

  const openModal = () => {
    setIsOpen(true);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleFilterChange = (e) => {
    closeModal();
    if (e.target.checked) {
      setFilters([...filters, e.target.name]);
    } else {
      setFilters(filters.filter((el) => el !== e.target.name));
    }
  };

  return (
    <Container>
      <Button onClick={openModal}>
        <ButtonText>Filter</ButtonText>
        <i className="fas fa-filter"></i>
      </Button>

      {isOpen &&
        ReactDOM.createPortal(
          <ModalContainer isVisible={isVisible}>
            <CloseButton onClick={closeModal}>
              <HamburgerLinesClose />
            </CloseButton>
            <FilterItem>
              <FilterItemText>S</FilterItemText>
              <FilterCheckbox
                type="checkbox"
                name="S"
                onChange={handleFilterChange}
                checked={filters.some((el) => el === 'S')}
              />
            </FilterItem>
            <FilterItem>
              <FilterItemText>M</FilterItemText>
              <FilterCheckbox
                type="checkbox"
                name="M"
                onChange={handleFilterChange}
                checked={filters.some((el) => el === 'M')}
              />
            </FilterItem>
            <FilterItem>
              <FilterItemText>L</FilterItemText>
              <FilterCheckbox
                type="checkbox"
                name="L"
                onChange={handleFilterChange}
                checked={filters.some((el) => el === 'L')}
              />
            </FilterItem>
            <FilterItem>
              <FilterItemText>XL</FilterItemText>
              <FilterCheckbox
                type="checkbox"
                name="XL"
                onChange={handleFilterChange}
                checked={filters.some((el) => el === 'XL')}
              />
            </FilterItem>
          </ModalContainer>,
          document.getElementById('modal')
        )}
    </Container>
  );
};

export default FilterButton;
