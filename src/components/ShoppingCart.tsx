import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ItemMediumCard from "./ItemMediumCard";
import Button from "./ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

interface ShoppingCartProps {
  isVisible: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShoppingCart(props: ShoppingCartProps) {
  const { cartItems, cartTotal, saveCartItems, isCartError, cartLoading } =
    useCart();
  const [itemCards, setItemCards] = useState<JSX.Element[]>([]);

  function loadCartItems() {
    if (isCartError) {
      setItemCards([<p>There was an error</p>]);
      return;
    } else if (cartLoading) {
      setItemCards([
        <div role="status" className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>,
      ]);
      return;
    } else {
      const tempCards: JSX.Element[] = [];
      cartItems.forEach(function (value, key) {
        tempCards.push(
          <ItemMediumCard item={key} countOfItem={value} key={uuidv4()} />
        );
      });
      setItemCards(tempCards);
    }
  }

  useEffect(loadCartItems, [cartItems, isCartError, cartLoading]);

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
      <div className="bg-white h-screen flex flex-col w-full max-w-md gap-3 overflow-auto overscroll-none fixed top-0">
        <div className="flex flex-row flex-wrap-reverse items-center justify-between px-10 py-5 gap-x-10 gap-y-5 sticky top-0 bg-black text-white">
          <h2 className="text-3xl font-bold">Your shopping cart</h2>
          <button
            className="self-center ml-auto"
            onClick={(e) => props.setShowModal(false)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
        <div className="flex flex-col gap-7 px-10 pb-5">
          {itemCards}
          <div className="flex flex-col items-center font-bold gap-3 text-2xl">
            <p>Total: ${cartTotal.toFixed(2)}</p>
            <Button
              className="bg-green-500 w-full h-14"
              onClick={(e: any) => {
                saveCartItems();
              }}
            >
              Save Cart
            </Button>
            <Button className="w-full h-14" onClick={(e: any) => {}}>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
