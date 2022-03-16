import styled, { css, keyframes } from 'styled-components';

const Container = styled.div`
  height: 2.3em;
  width: 2.3em;
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border: 1px solid #000a;
  border-radius: 100%;
  /* box-shadow: 0 0 13px #0003 inset; */
  color: #000;
`;

const Icon = styled.i`
  font-size: 1.5em;
  color: #fff;
`;

const Image = styled.img`
  height: 1.5em;
  width: 1.5em;
`;

const TooltipAnimationOpen = keyframes`
  0% {
    opacity: 0%;
    transform:  translateY(0);
  }

  100% {
    opacity: 100%;
    transform:  translateY(2.2em);
  }
`;

const TooltipAnimationClose = keyframes`
  0% {
    opacity: 100%;
    transform:  translateY(2.2em);
  }

  100% {
    opacity: 0%;
    transform:  translateY(0);
  }
  
`;

const TooltipAnimatedOpen = css`
  animation-name: ${TooltipAnimationOpen};
  animation-duration: 0.6s;
  animation-fill-mode: both;
`;

const TooltipAnimatedClose = css`
  animation-name: ${TooltipAnimationClose};
  animation-duration: 0.6s;
  animation-fill-mode: both;
`;

// const Tooltip = styled.div`
//   width: max-content;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 9;
//   padding: 5px 8px;
//   text-align: justify;
//   opacity: 0%;

//   background: #333;
//   color: #fff;

//   ${({ animated }) => (animated ? TooltipAnimatedOpen : TooltipAnimatedClose)}
// `;

// TAG #6ab64c

const Tag = ({ name, tooltipText }) => {
  // const [tooltipOpen, setTooltipOpen] = useState(false);

  // const changeTooltipStatus = () => {
  //   setTooltipOpen(!tooltipOpen);

  // setTimeout(() => {
  //   setTooltipOpen(false);
  // }, 2000);
  // };

  // const color = name === 'vegan' ? '#6ab64c' : '#e6cb56';
  // const JSXIcon =
  // name === 'vegan' ? <Icon className="fas fa-seedling" color={color}></Icon> : <Image src={glutenImage} />;

  return (
    <Container color="#fff">
      {name}
      {/* <Tooltip animated={tooltipOpen}>{tooltipText}</Tooltip> */}
    </Container>
  );
};

export default Tag;
