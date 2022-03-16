import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderContainer = styled.div`
  height: 92vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotsContainer = styled.div`
  width: 15vw;
  display: flex;
  justify-content: space-between;
`;

const dotCicle = keyframes`
    0% {
        opacity:0%;
        transform: translateY(0.5em)
    }
    100% {
        opacity:100%;
        transform: translateY(0em)
    }
`;

const Dot = styled.div`
  height: 1em;
  width: 1em;
  background: #88e;
  border-radius: 100%;
  overflow: hidden;

  animation: ${dotCicle} 0.5s linear ${(props) => props.delay} infinite alternate both;
`;

/* ${desktopMediaQuery} {
    height: 2em;
    width: 2em;
  } */

const PageLoader = () => {
  return (
    <LoaderContainer>
      <DotsContainer>
        <Dot delay="0s" />
        <Dot delay="0.25s" />
        <Dot delay="0.50s" />
      </DotsContainer>
    </LoaderContainer>
  );
};

export default PageLoader;
