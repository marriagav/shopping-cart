import React, { useContext, useState } from "react";

interface CartContextInterface {
  cartItems: Map<item, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Map<item, number>>>;
  addCartItem(item: item): void;
}

const CartContext = React.createContext<CartContextInterface>(
  {} as CartContextInterface
);

function useCart() {
  return useContext(CartContext);
}

interface CartProviderProps {
  children: JSX.Element;
}

function CartProvider(props: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Map<item, number>>(
    new Map<item, number>()
  );

  function addCartItem(item: item) {
    const cartItemsCopy = new Map(cartItems);
    if (cartItems?.has(item)) {
      const curCount = cartItemsCopy.get(item);
      cartItemsCopy.set(item, curCount ? curCount + 1 : 0);
    } else {
      cartItemsCopy.set(item, 1);
    }
    setCartItems(cartItemsCopy);
    console.log(cartItems);
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addCartItem }}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
