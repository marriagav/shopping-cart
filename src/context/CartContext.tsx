import React, { useContext, useEffect, useState } from "react";
import { saveCart, loadCart, isUserSignedIn, auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface CartContextInterface {
  cartItems: Map<item, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Map<item, number>>>;
  addCartItem(item: item): void;
  removeCartItem(item: item): void;
  cartTotal: number;
  saveCartItems(): void;
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
  const [deletedItems, setDeletedItems] = useState<item[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (isUserSignedIn()) {
        const CartItems = await loadCart();
        setCartItems(CartItems);
        let total = 0;
        CartItems.forEach((value, key) => {
          total += key.price * value;
        });
        setCartTotal(total);
      } else {
        setCartItems(new Map<item, number>());
        setCartTotal(0);
      }
    });
  }, []);

  function addCartItem(item: item) {
    const cartItemsCopy = new Map(cartItems);
    if (cartItems?.has(item)) {
      const curCount = cartItemsCopy.get(item);
      cartItemsCopy.set(item, curCount ? curCount + 1 : 0);
    } else {
      cartItemsCopy.set(item, 1);
    }
    setCartItems(cartItemsCopy);
    setCartTotal(cartTotal + item.price);
    if (deletedItems.includes(item)) {
      setDeletedItems(deletedItems.filter((i) => i !== item));
    }
  }

  function removeCartItem(item: item) {
    const cartItemsCopy = new Map(cartItems);
    if (cartItems?.has(item)) {
      const curCount = cartItemsCopy.get(item);
      const newCount = curCount ? curCount - 1 : 0;
      if (newCount === 0) {
        cartItemsCopy.delete(item);
        setCartItems(cartItemsCopy);
        setDeletedItems([...deletedItems, item]);
      } else {
        cartItemsCopy.set(item, newCount);
        setCartItems(cartItemsCopy);
      }
      setCartTotal(cartTotal - item.price);
    }
  }

  function saveCartItems() {
    saveCart(cartItems, deletedItems);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addCartItem,
        removeCartItem,
        cartTotal,
        saveCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
