import formatPrice from './formatPrice';

const genWhatsappMessage = (products, total, detalles) => {
  if (products === null || total === null) return '';
  const productsMessageFragment = `${products
    .map(
      (product) =>
        `-- ${product.amount !== 1 ? `*[${product.amount}]*` : ''} ${product.name} > *$${formatPrice(product.price)}*\n`
    )
    .join('')}`;

  const totalMessageFragment = `*Total: $${formatPrice(total)}*`;

  const detallesMessageFragment = `Forma de pago: ${detalles.formaDePago}\nForma de entrega: ${detalles.formaDeEntrega}`;

  const message = `PEDIDO:\n\n${productsMessageFragment}\n${totalMessageFragment}\n\n${detallesMessageFragment}`;
  return encodeURI(message);
};

export default genWhatsappMessage;
