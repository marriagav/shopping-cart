import React from "react";
import { useCart } from "../context/CartContext";

interface itemMediumCardProps {
  item: item;
  countOfItem: number;
}

function ItemMediumCard(props: itemMediumCardProps) {
  const { cartItems, addCartItem } = useCart();
  console.log(props.item);
  return (
    <div className="flex flex-col justify-between items-center border-solid border border-gray-200 shadow rounded-lg gap-3 w-full p-2">
      <div className="flex items-center justify-center h-40 w-full border-solid border-b p-3 rounded-t border-gray-200">
        <img
          src={props.item.image}
          alt={props.item.title}
          className="object-contain h-full"
        />
      </div>
      <h2 className="text-center font-bold w-full">{props.item.title}</h2>
      <p>${props.item.price}</p>
      <button
        className="bg-black text-white text-bold p-3 w-full rounded-lg margin-3"
        onClick={(e) => {
          addCartItem(props.item);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ItemMediumCard;
