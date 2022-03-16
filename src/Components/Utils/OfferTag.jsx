import styled from 'styled-components';

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 4px;
  border: 1px solid #111;
  border-radius: 4px;
  margin-left: 0.5rem;
  background: ${({ solid }) => (solid ? '#151515' : 'transparent')};
  color: ${({ solid }) => (solid ? '#fff' : '#000')};
`;

const OfferTag = ({ price, offerPrice, solid = false }) => {
  const porcentage = 100 - (offerPrice * 100) / price;

  return <TagContainer solid={solid}>{Math.round(porcentage)}% OFF</TagContainer>;
};

export default OfferTag;
