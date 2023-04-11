import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h2>We don't do fashion, we are fashion</h2>
      <button
        onClick={(e) => {
          navigate("/products");
        }}
      >
        Start shopping
      </button>
    </>
  );
}

export default Home;
