import { createContext, useState } from 'react';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const removeFromCart = (productIdToRemove) => {
    setCartProducts(cartProducts.filter((el) => el.product.id !== productIdToRemove));
  };

  const incrementOne = (productId, amount = 1) => {
    const newData = cartProducts.map((el) => {
      if (el.product.id === productId) return { product: el.product, amount: el.amount + amount };
      else return el;
    });
    setCartProducts(newData);
  };

  const reduceOne = (productId) => {
    const newData = cartProducts.map((el) => {
      //if found the product
      if (el.product.id === productId) {
        //if the amount will be 0
        if (el.amount === 1) return null;
        //remove one
        else return { product: el.product, amount: el.amount - 1 };
      } else {
        return el;
      }
    });
    setCartProducts(newData);
  };

  const addToCart = (newProduct, amount) => {
    if (!cartProducts) setCartProducts([{ product: newProduct, amount: amount }]);
    else if (cartProducts.some((el) => el.product.id === newProduct.id)) incrementOne(newProduct.id, amount);
    else setCartProducts([...cartProducts, { product: newProduct, amount: amount }]);
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, incrementOne, reduceOne }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
