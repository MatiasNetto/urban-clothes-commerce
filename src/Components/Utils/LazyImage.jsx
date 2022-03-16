import { useEffect, useRef } from 'react';
import useOnScreen from '../../Hooks/useOnScreen';

const LazyImage = () => {
  const ref = useRef();
  const isNearScreen = useOnScreen(ref, '0px');

  useEffect(() => {
    if (isNearScreen) {
      console.log('Intersecting');
      ref.current.src = ref.current.getAttribute('data-src');
    }
  }, [isNearScreen]);

  return (
    <img
      style={{ height: '30em', width: '30em' }}
      ref={ref}
      src="https://source.unsplash.com/20x20/?nature"
      data-src="https://source.unsplash.com/720x900/?nature"
      alt="test"
    />
  );
};

export default LazyImage;
