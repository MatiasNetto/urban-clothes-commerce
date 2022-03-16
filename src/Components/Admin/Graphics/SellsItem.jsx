import styled from 'styled-components';

const SellContainer = styled.tr`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  /* background: ${({ dark }) => (dark ? '#eaeaea' : '#f5f5f5')}; */
  border-bottom: 1px solid #999;
`;

const UserContainer = styled.td`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Index = styled.td`
  /* width: 2em; */
  margin-right: 1em;
`;

const ImageContainer = styled.div`
  height: 3em;
  width: 3em;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const Name = styled.p`
  margin-left: 1em;
`;

const Amount = styled.td`
  padding: 0 0.5em;
`;

const SellsItem = ({ data, dark, index }) => {
  const { productName, amount, productImage } = data;

  return (
    <SellContainer dark={dark}>
      <Index>{index + 1}</Index>
      <UserContainer>
        <ImageContainer>
          <Image src={productImage} />
        </ImageContainer>
        <Name>{productName}</Name>
      </UserContainer>
      <Amount>{amount}</Amount>
    </SellContainer>
  );
};

export default SellsItem;
