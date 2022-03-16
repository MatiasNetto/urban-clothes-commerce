import styled from 'styled-components';
import { desktopMediaQuery } from '../../styles';

import imagePlus from '../../Assets/Images/Icons/plus-solid.svg';
import imageMinus from '../../Assets/Images/Icons/minus-solid.svg';

const AmountContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.8em;
  /* border: 1px solid #dd6b20; */
  border-radius: 100px;
  padding: 4px;

  ${desktopMediaQuery} {
    width: ${({ width }) => (width ? width : '30%')};
    /* width: 30%; */
  }
`;

const AmountButton = styled.button`
  height: 1.9em;
  width: 1.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: #dd6b20;
  outline: none;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;

  ${({ disabled }) => disabled && 'filter: grayscale(40%);'}

  &:hover {
    border: 2px solid #8dc2ed;
  }

  &:active {
    border: 2px solid #8dc2ed;
  }

  &:focus {
    border: 2px solid #8dc2ed;
  }
`;

const AmountButtonText = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  font-size: 1.3em;
`;

const AmountValue = styled.p`
  font-size: 1.2em;
  padding: 0 0.6rem;

  ${desktopMediaQuery} {
    font-size: 1.4em;
  }
`;

const AmountCounter = ({ amount, incrementFunction, decrementFunction }) => {
  return (
    <AmountContainer>
      <AmountButton disabled={amount === 1 ? true : false} onClick={decrementFunction}>
        <AmountButtonText src={imageMinus} alt="minus button" />
      </AmountButton>
      <AmountValue>{amount}</AmountValue>
      <AmountButton onClick={incrementFunction}>
        <AmountButtonText src={imagePlus} alt="plus button" />
      </AmountButton>
    </AmountContainer>
  );
};

export default AmountCounter;
