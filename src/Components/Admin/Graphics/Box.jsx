import styled from 'styled-components';
import { desktopMediaQuery } from '../../../styles';

const Container = styled.div`
  width: 80%;
  height: 20vh;
  display: flex;

  margin: 3vh auto;
  padding: 1.5em 2em;
  background: #fff;
  box-shadow: 0 0 8px #0002;
  border-radius: 4px;

  ${desktopMediaQuery} {
    width: 30%;
  }
`;

const DataContainer = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const LogoContainer = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Logo = styled.i`
  font-size: 2em;
  margin-right: 0.3em;
`;

const Tittle = styled.p`
  font-size: 1.35em;
  color: #555;
`;

const Text = styled.p`
  font-size: 1.4em;
`;

const Box = ({ data }) => {
  return (
    <Container>
      <DataContainer>
        <Tittle>{data.tittle}</Tittle>
        <Text>{data.amount}</Text>
      </DataContainer>
      <LogoContainer>
        <Logo className={data.logo} />
      </LogoContainer>
    </Container>
  );
};

export default Box;
