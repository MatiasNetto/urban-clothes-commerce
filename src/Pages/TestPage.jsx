import Loader from '../Components/Utils/Loader';
import useGetCategory from '../Hooks/useGetCategory';
import addProductService from '../Services/addProductService';

const TestPage = () => {
  // const text = encodeURI(`Hola como estas\nmi nombre es matias`);
  // getTopSells('vinos').then((res) => console.log(res));

  // console.log(formatPrice(1512));
  // return <>{/* <a href={`https://wa.me/5491145265942?text=${text}`}>Link!</a> */}</>;

  const { products, loading } = useGetCategory('buzzos-y-camperas');

  const migrate = async (products) => {
    const newProducts = products.map((el) => ({ ...el, category: 'buzos-y-camperas' }));

    for (let i = 0; i < newProducts.length; i++) {
      await addProductService(newProducts[i]);
    }

    alert('Listorti');
  };

  if (loading) return <Loader />;

  return (
    <div>
      <button
        onClick={() => {
          // migrate(products);
          alert('La migracion esta desactivada por codigo por seguridad');
        }}
      >
        Let's do it
      </button>
      <br />
      {JSON.stringify(products)}
    </div>
  );
};

export default TestPage;
