const formatPrice = (price, decimals = false) => {
  let formatPrice = new Intl.NumberFormat('de-DE').format(price);
  if (decimals && !formatPrice.includes('.')) formatPrice += ',00';
  return formatPrice;
};

export default formatPrice;
