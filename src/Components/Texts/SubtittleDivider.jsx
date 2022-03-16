import styled from 'styled-components';

const Text = styled.h3`
  padding: 5px 0;
  margin: 1em 0;
  font-size: 1.5em;
  text-align: center;
  color: #333;
  font-weight: 400;
  border-bottom: 1px solid #000;
`;

const SubtittleDivider = ({ text = '' }) => {
  return <Text>{text}</Text>;
};

export default SubtittleDivider;
