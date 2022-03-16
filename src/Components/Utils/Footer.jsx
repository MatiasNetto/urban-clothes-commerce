import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #23394d;
`;
const Text = styled.p`
  color: #111;
`;

const Footer = () => {
  const [touches, setTouches] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (touches === 10) {
      history.push('/admin');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [touches, history]);

  const handleTextClick = () => {
    setTouches((amount) => amount + 1);
  };

  return (
    <Container onClick={handleTextClick}>
      <Text>©Urban Clothes</Text>
    </Container>
  );
};

export default Footer;
