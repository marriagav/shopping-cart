import React from "react";
import { useCart } from "../context/CartContext";
import Button from "./ui/Button";

interface itemMediumCardProps {
  item: item;
  countOfItem: number;
}

function ItemMediumCard(props: itemMediumCardProps) {
  const { addCartItem, removeCartItem } = useCart();
  return (
    <div className="flex flex-row justify-between items-center border-solid border border-gray-200 shadow rounded-lg gap-3 w-full p-2">
      <div className="flex items-center justify-start h-40 w-40 p-3">
        <img
          src={props.item.image}
          alt={props.item.title}
          className="object-contain h-full"
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-2 w-full">
        <h2 className="text-center font-bold w-full">{props.item.title}</h2>
        <p>${props.item.price}</p>
        <div className="flex flex-row justify-between items-center gap-5">
          <Button
            className="bg-gray-300 rounded-none px-3 py-2 text-black"
            onClick={(e) => {
              removeCartItem(props.item);
            }}
          >
            -
          </Button>
          <p>{props.countOfItem}</p>
          <Button
            className="bg-gray-300 rounded-none px-3 py-2 text-black"
            onClick={(e) => {
              addCartItem(props.item);
            }}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemMediumCard;
