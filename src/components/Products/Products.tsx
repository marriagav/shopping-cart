import React, { useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { useEffect } from "react";
import ItemLargeCard from "../ItemLargeCard/ItemLargeCard";

function Products() {
  const { isLoading, fetchedData } = useHttp({
    url: `https://fakestoreapi.com/products`,
    dependencies: [],
  });
  const [items, setItems] = useState<item[]>([]);

  useEffect(() => {
    if (fetchedData) {
      // console.log(fetchedData);
      const dataArray = fetchedData as Array<any>;
      setItems(
        dataArray.map((item: item) => {
          return item;
        })
      );
    }
  }, [fetchedData]);

  function renderThis() {
    if (isLoading) {
      return <p>Loading</p>;
    } else {
      return items.map((item: item) => {
        return <ItemLargeCard item={item}></ItemLargeCard>;
      });
    }
  }

  return (
    <div>
      <h1>Products</h1>
      {renderThis()}
    </div>
  );
}

export default Products;
