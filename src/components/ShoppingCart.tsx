import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import ItemMediumCard from "./ItemMediumCard";
import { useContext } from "react";

function ShoppingCart() {
  const { cartItems, setCartItems } = useCart();
  let itemCards: JSX.Element[] = [];
  //   if (Array.isArray(cartItems)) {
  //     itemCards = cartItems.map((item: item) => {
  //       return <ItemMediumCard item={item} key={item.id} />;
  //     });
  //   }
  function loadCartItems() {
    cartItems.forEach(function (value, key) {
      itemCards.push(<ItemMediumCard item={key} countOfItem={value} />);
    });
  }
  useEffect(loadCartItems, [cartItems]);

  console.log(cartItems);

  return <>{itemCards}</>;
}

export default ShoppingCart;
