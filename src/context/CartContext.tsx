import React, { useContext, useState } from "react";
import { Interface } from "readline";

const CartContext = React.createContext<any[]>([]);

function useCart() {
  return useContext(CartContext);
}

interface CartProviderProps {
  children: JSX.Element;
}

function CartProvider(props: CartProviderProps) {
  const [cartItems, setCartItems] = useState<item[]>([]);

  //   function modifyCartItems(items: item[]) {
  //     setCartItems(items);
  //   }

  console.log(cartItems);

  return (
    <CartContext.Provider value={[cartItems, setCartItems]}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
