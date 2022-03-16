import { useRef } from 'react';
import useOnScreen from '../../Hooks/useOnScreen.js';

const LazyLoading = ({ children }) => {
  const ref = useRef();
  const show = useOnScreen(ref, '1200px');
  return (
    <div style={{ minHeight: '30vh' }} ref={ref}>
      {show ? children : null}
    </div>
  );
};

export default LazyLoading;
