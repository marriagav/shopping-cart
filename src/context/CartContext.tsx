import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSaveCart, useLoadCart } from "../hooks/firebaseHooks";

interface CartContextInterface {
  cartItems: Map<item, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Map<item, number>>>;
  addCartItem(item: item): void;
  removeCartItem(item: item): void;
  cartTotal: number;
  saveCartItems(): void;
  cartLoading: boolean;
  isCartError: boolean;
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
  const { isUserSignedIn } = useAuth();

  const {
    mutate: saveCart,
    isLoading: isUploadLoading,
    error: isUploadError,
  } = useSaveCart();

  const {
    data: cartData,
    isLoading: isCartLoading,
    error: CartError,
  } = useLoadCart();

  const [isCartError, setIsCartError] = useState<boolean>(false);
  const [cartLoading, setcartLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isUserSignedIn) {
      if (cartData) {
        const CartItems = cartData;
        setCartItems(CartItems ? CartItems : new Map());
        let total = 0;
        CartItems?.forEach((value, key) => {
          total += key.price * value;
        });
        setCartTotal(total);
      }
    } else {
      setCartItems(new Map<item, number>());
      setCartTotal(0);
      setIsCartError(false);
      setcartLoading(false);
    }
  }, [isUserSignedIn, cartData]);

  useEffect(() => {
    if (CartError || isUploadError) {
      setIsCartError(true);
    } else {
      setIsCartError(false);
    }
    if (isCartLoading || isUploadLoading) {
      setcartLoading(true);
    } else {
      setcartLoading(false);
    }
  }, [
    isUserSignedIn,
    isCartLoading,
    CartError,
    isUploadLoading,
    isUploadError,
  ]);

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

  async function saveCartItems() {
    saveCart({ cart: cartItems, deletedItems: deletedItems });
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
        cartLoading,
        isCartError: isCartError,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
