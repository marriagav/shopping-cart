import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ItemMediumCard from "./ItemMediumCard";
import Button from "./ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface ShoppingCartProps {
  isVisible: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShoppingCart(props: ShoppingCartProps) {
  const { cartItems, cartTotal } = useCart();
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

  function handleCloseModal(e: any) {
    if (e.target.id === "shopping-wrapper") {
      props.setShowModal(false);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-end items-center w-full h-full z-20"
      id="shopping-wrapper"
      onClick={handleCloseModal}
    >
      <div className="bg-white h-screen flex flex-col w-full max-w-md gap-3">
        <div className="flex flex-row flex-wrap-reverse items-center justify-between px-10 py-5 gap-x-10 gap-y-5">
          <h2 className="text-3xl font-bold">Your shopping cart</h2>
          <button
            className="self-center ml-auto"
            onClick={(e) => props.setShowModal(false)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
        <div className="overflow-auto flex flex-col gap-7 px-10 pb-5">
          {itemCards}
          <div className="flex flex-col items-center font-bold gap-3 text-2xl">
            <p>Total: ${cartTotal.toFixed(2)}</p>
            <Button className="w-full h-14" onClick={(e: any) => {}}>
              Check Out
            </Button>
            <Button
              className="bg-red-500 w-full h-14"
              onClick={(e: any) => {
                props.setShowModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
