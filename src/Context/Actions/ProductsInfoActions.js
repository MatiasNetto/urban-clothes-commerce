// const

export const addCategoryAction = (category, data) => {
  return { type: '@productsInfo/addCategory', category: category, payload: data };
};

export const addProductAction = (product) => {
  return { type: '@productsInfo/addProduct', payload: product };
};

export const removeProductAction = (product) => {
  return { type: '@productsInfo/removeProduct', payload: product };
};

export const editProductAction = (oldProduct, newProduct) => {
  return { type: '@productsInfo/editProduct', oldProduct, newProduct };
};
