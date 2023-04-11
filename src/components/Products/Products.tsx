import React from "react";
import { useHttp } from "../hooks/useHttp";

function Products() {
  const { isLoading, fetchedData } = useHttp({
    url: `https://fakestoreapi.com/products`,
    dependencies: [],
  });

  let items: item[] = [];

  if (fetchedData) {
    // console.log(fetchedData);
    const dataArray = fetchedData as Array<any>;
    dataArray.forEach((item: item) => {
      items.push(item);
    });
    console.log(items);
  }

  return <h1>Products</h1>;
}

export default Products;
