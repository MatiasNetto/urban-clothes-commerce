import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useOnScreen from '../../Hooks/useOnScreen';

const Container = styled.div`
  height: fit-content;
  width: fit-content;
  position: absolute;
  right: 1em;
  top: 2000px;
`;

const Button = styled.div`
  height: 20vw;
  width: 20vw;
  position: fixed;
  right: 1em;
  bottom: 1em;
  z-index: 9999;
  background: #eeee;
  border-radius: 100%;
`;

const ScrollUpButton = () => {
  const ref = useRef();
  const show = useOnScreen(ref, '0px');
  return <Container ref={ref}> Contenedor{show ? <Button></Button> : null}</Container>;
};

export default ScrollUpButton;
