import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
// import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProductImagesSlider = ({ images }) => {
  let options;

  if (window.innerWidth <= 996) {
    options = { height: '60vh', width: '90vw', cover: true, lazyLoad: 'nearby' };
  } else {
    options = { height: '75vh', width: '90vw', cover: true, lazyLoad: 'nearby' };
  }

  return (
    <Splide options={options}>
      {images.map((image) => (
        <SplideSlide key={image}>
          <Image src={image} alt="" />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default ProductImagesSlider;
