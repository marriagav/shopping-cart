import React, { useEffect, useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import ItemMediumCard from "./ItemMediumCard";

function ShoppingCart() {
  const { cartItems, setCartItems } = useCart();
  const [itemCards, setItemCards] = useState<JSX.Element[]>([]);

  function loadCartItems() {
    const tempCards: JSX.Element[] = [];
    cartItems.forEach(function (value, key) {
      tempCards.push(<ItemMediumCard item={key} countOfItem={value} />);
    });
    setItemCards(tempCards);
  }
  useEffect(loadCartItems, [cartItems]);

  return <>{itemCards}</>;
}

export default ShoppingCart;
