import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "./ShoppingCart";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <nav className="flex flex-row justify-around items-center gap-10 p-6 bg-black text-white">
        <h1 className="text-4xl font-bold">FakeStore</h1>
        <ul className="flex flex-row justify-center items-center gap-10">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <button onClick={(e) => setShowModal(true)}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </li>
        </ul>
      </nav>
      <ShoppingCart isVisible={showModal} />
    </>
  );
}

export default NavBar;
