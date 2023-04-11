import React from "react";
import { useHttp } from "../hooks/useHttp";
import ItemLargeCard from "../ItemLargeCard/ItemLargeCard";

function Products() {
  const { isLoading, fetchedData } = useHttp({
    url: `https://fakestoreapi.com/products`,
    dependencies: [],
  });

  let items: item[] = [];
  let itemCards: JSX.Element[] = [];

  if (fetchedData) {
    // console.log(fetchedData);
    const dataArray = fetchedData as Array<any>;
    dataArray.forEach((item: item) => {
      // items.push(item);
      itemCards.push(<ItemLargeCard item={item}></ItemLargeCard>);
    });
    console.log(items);
  }

  return (
    <div>
      <h1>Products</h1>
      {itemCards}
    </div>
  );
}

export default Products;
