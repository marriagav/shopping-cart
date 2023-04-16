import React, { useEffect, useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import ItemMediumCard from "./ItemMediumCard";
import Button from "./ui/Button";

interface ShoppingCartProps {
  isVisible: boolean;
}

function ShoppingCart(props: ShoppingCartProps) {
  const { cartItems, setCartItems } = useCart();
  const [itemCards, setItemCards] = useState<JSX.Element[]>([]);

  function loadCartItems() {
    const tempCards: JSX.Element[] = [];
    cartItems.forEach(function (value, key) {
      tempCards.push(
        <ItemMediumCard item={key} countOfItem={value} key={key.id} />
      );
    });
    setItemCards(tempCards);
  }
  useEffect(loadCartItems, [cartItems]);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-end items-center w-full h-full z-20">
      <div className="bg-white h-screen">
        <h2>Your Shopping cart</h2>
        {itemCards}
        <Button onClick={(e: any) => {}}>Check Out</Button>
        <Button className="bg-red-500 text-yellow-500" onClick={(e: any) => {}}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
