/* 
Info structure

{
    category1:[{prodcut},{product}]
    category2:[{prodcut},{product}]
    category3:[{prodcut},{product}]
}


*/

const initialState = {};

const productsInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@productsInfo/addCategory':
      return { ...state, [action.category]: action.payload };

    case '@productsInfo/addProduct':
      if (state[action.payload.category]) {
        state[action.payload.category] = state[action.payload.category].concat(action.payload);
      }
      return state;

    case '@productsInfo/removeProduct':
      state[action.payload.category] = state[action.payload.category].filter((el) => el.id !== action.payload.id);
      return state;

    case '@productsInfo/editProduct':
      const oldCategory = action.oldProduct.category;
      const newCategory = action.newProduct.category;

      if (state[oldCategory]) state[oldCategory] = state[oldCategory].filter((el) => el.id !== action.oldProduct.id); //remove old product
      if (state[newCategory]) state[newCategory] = state[newCategory].concat(action.newProduct); //add new product
      return state;

    default:
      return state;
  }
};

export default productsInfoReducer;
