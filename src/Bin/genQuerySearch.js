const calcTotalPrice = (products) => {
  let total = 0;
  products.forEach((el) => {
    total = Number(total) + Number(el.product.price) * Number(el.amount);
  });
  return total;
};

const genQuerySearch = (products) => {
  const productsFormatted = products.map((el) => {
    return { name: el.product.name, amount: el.amount, price: el.product.price * el.amount };
  });

  const query = new URLSearchParams({ products: JSON.stringify(productsFormatted), total: calcTotalPrice(products) });
  return query.toString();
};

export default genQuerySearch;
