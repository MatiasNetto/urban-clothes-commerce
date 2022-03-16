const scrollToProduct = (productId) => {
  const card = document.getElementById(productId);

  if (card === undefined || card === null) return;
  else card.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export default scrollToProduct;
