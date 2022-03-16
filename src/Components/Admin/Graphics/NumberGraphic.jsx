import styled from 'styled-components';

const Container = styled.div``;

const Tittle = styled.p``;

const Number = styled.p``;

const NumberGraphic = (number) => {
  return (
    <Container>
      <Tittle></Tittle>
      <Number>{number}</Number>
    </Container>
  );
};

export default NumberGraphic;
