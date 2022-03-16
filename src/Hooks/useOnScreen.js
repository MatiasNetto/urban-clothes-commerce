import { useEffect, useState } from 'react';

function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [show, setShow] = useState(false);

  const onChange = (entries, observer) => {
    const el = entries[0];
    if (el.isIntersecting) {
      setShow(el.isIntersecting);
      observer.unobserve(ref.current);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onChange, {
      rootMargin,
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return show;
}

export default useOnScreen;
