import React from "react";
import { useCart } from "../context/CartContext";
import Button from "./ui/Button";

interface itemLargeCardProps {
  item: item;
}

function ItemLargeCard(props: itemLargeCardProps) {
  const { addCartItem } = useCart();
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
      <Button
        onClick={(e: any) => {
          addCartItem(props.item);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}

export default ItemLargeCard;
