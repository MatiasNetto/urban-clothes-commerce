// const sortProducts = (products) => {
//   return products?.sort((a, b) => Number(a.order) + Number(a.subOrder) > Number(b.order) + Number(b.subOrder));
// };

const sortProducts = (products) => {
  const avaibleProducts = products?.filter((el) => !el.outOfStock);
  const unavaibleProducts = products?.filter((el) => el.outOfStock);
  let sortedProducts = [];

  if (avaibleProducts) {
    sortedProducts = avaibleProducts?.sort((a, b) => {
      const orderNumberA = parseInt(a.order) + parseFloat(a.subOrder);
      const orderNumberB = parseInt(b.order) + parseFloat(b.subOrder);
      return orderNumberA - orderNumberB;
    });
  }

  if (unavaibleProducts) {
    sortedProducts = [...sortedProducts, ...unavaibleProducts];
  }

  return sortedProducts;
};

export default sortProducts;
