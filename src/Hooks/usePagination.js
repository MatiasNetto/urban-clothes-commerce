import { useState } from 'react';

const usePagination = (elementsPerPage = 5) => {
  const [range, setRange] = useState(elementsPerPage);

  const loadNextPage = () => {
    console.log('loading next page');
    setRange(range + elementsPerPage);
  };

  const setVisor = (element, distance = 300) => {
    //en caso de que element exista lo transforma en un visor que pasa de pagina al llegar al limite de la distancia establecida
    if (element !== undefined) {
      window.addEventListener('scroll', () => {
        const rect = element.getBoundingClientRect().top;
        console.log(rect);
        if (rect <= window.innerHeight + distance) {
          loadNextPage();
        }
      });
    }
  };

  return [range, setRange, setVisor];
};

export default usePagination;
