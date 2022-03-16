import { Splide, SplideSlide } from '@splidejs/react-splide';
import reactDom from 'react-dom';
import styled from 'styled-components';
import { desktopMediaQuery } from '../../../styles';
import '@splidejs/splide/dist/css/splide.min.css';
import { colorRed } from '../../../styles';

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  display: flex;
  justify-content: center;
  background: #0008;
  backdrop-filter: blur(3px);

  ${desktopMediaQuery} {
    align-items: center;
  }
`;

const Container = styled.div`
  height: 80%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3vh;
  margin-top: 10%;
  background: #fff;
  border-radius: 5px;

  ${desktopMediaQuery} {
    width: 30%;
    height: 80%;
    margin-top: 0;
  }
`;

const Tittle = styled.h4`
  font-size: 2.3em;
  text-align: center;
`;

const SliderContainer = styled.div`
  /* height: 70%; */
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ButtonsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: start;

  ${desktopMediaQuery} {
    flex-direction: row;
  }
`;

const Button = styled.button`
  height: fit-content;
  min-width: fit-content;
  /* font-size: ${({ status }) => (status === 'uploading' || status === 'uploaded' ? `1.1em` : `1.3em`)}; */
  font-size: 1.2em;
  padding: 8px 22px;
  margin-top: 10px;
  background: ${({ color }) => (color ? `${color}` : `transparent`)};
  border: 2px solid ${({ color }) => (color ? color : `#0005`)};
  border-radius: 5px;
  cursor: pointer;

  transition: filter 0.3s;

  &:hover {
    filter: brightness(90%);
  }

  ${desktopMediaQuery} {
    margin-top: 0;
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 2em;
`;

const PreviewImagesModal = ({ images, setOpenPreviewFiles }) => {
  const handleExit = () => {
    setOpenPreviewFiles(false);
  };

  return reactDom.createPortal(
    <>
      <BackgroundContainer>
        <Container>
          <Tittle>Preview</Tittle>
          <SliderContainer>
            {images.length !== 0 ? (
              <Splide options={{ type: 'slide', width: '100%', height: '60vh' }}>
                {images.map((image) => (
                  <SplideSlide key={image}>
                    <Image src={image} />
                  </SplideSlide>
                ))}
              </Splide>
            ) : (
              <ErrorMessage>No hay imagenes</ErrorMessage>
            )}
          </SliderContainer>
          <ButtonsContainer>
            <Button color={colorRed} onClick={handleExit}>
              Salir
            </Button>
          </ButtonsContainer>
        </Container>
      </BackgroundContainer>
    </>,
    document.getElementById('upload-files-modal')
  );
};

export default PreviewImagesModal;
