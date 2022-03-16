import styled from 'styled-components';
import { desktopMediaQuery } from '../../styles';

const Text = styled.h3`
  padding: 5px 0;
  margin: 0.5em 0;
  font-size: 2em;
  text-align: center;
  border-bottom: 1px solid #000;

  ${desktopMediaQuery} {
    font-size: 2.7em;
  }
`;

const TextDivider = ({ children, id = '_' }) => {
  return <Text id={id}>{children}</Text>;
};

export default TextDivider;
