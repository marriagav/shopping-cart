import React from "react";

interface itemLargeCardProps {
  item: item;
}

function ItemLargeCard(props: itemLargeCardProps) {
  return (
    <div>
      <img src={props.item.image} alt={props.item.title} />
      <h2>{props.item.title}</h2>
      <p>{props.item.price}</p>
      <button>Add to cart</button>
    </div>
  );
}

export default ItemLargeCard;
