import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homepageImage from "../../assets/images/homepage-image.png";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative md:flex md:flex-row md:p-20 items-center md:static">
      <div className="flex flex-col top-10 items-center w-full p-3 justify-center absolute z-10 md:static md:items-start gap-5">
        <h2 className="text-4xl font-bold text-center md:text-left lg:text-6xl">
          We don't do fashion, we are fashion
        </h2>
        <button
          className="bg-black text-white rounded-full p-3 font-bold md:w-1/2"
          onClick={(e) => {
            navigate("/products");
          }}
        >
          Start shopping
        </button>
      </div>
      <img
        className="absolute left-0 top-0 opacity-50 md:static md:opacity-100 md:w-3/5"
        src={homepageImage}
        alt="Homepage Image"
      />
    </div>
  );
}

export default Home;
