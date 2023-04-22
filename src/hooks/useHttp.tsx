import { useState, useEffect } from "react";

interface useHttpProps {
  url: string;
  dependencies: (string | number)[];
}

export const useHttp = (props: useHttpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(props.url);
      const data = await response.json();
      setIsLoading(false);
      setFetchedData(data);
    };
    console.log("Sending Http request to URL: " + props.url);
    try {
      fetchData();
    } catch (e) {
      console.error(e);
    }
  }, [props.dependencies, props.url]);

  return { isLoading, fetchedData };
};
