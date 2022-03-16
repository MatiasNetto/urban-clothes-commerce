import styled from 'styled-components';
import LogoImage from '../../Assets/Images/Logos/Logo-1.png';
import BackgroundImage from '../../Assets/Images/Backgrounds/Background-1.jpeg';
import { memo } from 'react';
import { desktopMediaQuery } from '../../styles';

const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: color;
  background-color: #0005;

  ${desktopMediaQuery} {
    height: 40vh;
  }
`;

const Logo = styled.img`
  width: 90%;

  ${desktopMediaQuery} {
    width: 25%;
  }
`;

const BrandLogo = () => {
  return (
    <Container>
      <Logo src={LogoImage} />
    </Container>
  );
};

export default memo(BrandLogo);
