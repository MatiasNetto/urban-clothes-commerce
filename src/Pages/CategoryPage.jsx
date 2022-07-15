import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import TextDivider from '../Components/Texts/TextDivider';
import CardsContainer from '../Components/Cards/CardsContainer';
import FilterButton from '../Components/TagsAndButtons/FilterButton';
import scrollToProduct from '../Bin/scrollToProduct';
import { ProductsInfoContext } from '../Context/ProductsInfoContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { lastProductVisited } = useContext(ProductsInfoContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setTimeout(() => scrollToProduct(lastProductVisited), 50);
  }, [lastProductVisited]);

  const capitalyze = (string) => {
    // return the string capitalyzed
    return (string.charAt(0).toUpperCase() + string.slice(1)).replaceAll('-', ' ');
  };

  return (
    <>
      <TextDivider>{capitalyze(category)}</TextDivider>
      <FilterButton />
      <CardsContainer category={category} />
    </>
  );
};

export default CategoryPage;
