import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SignInSection from "./SignInSection";
import ShoppingCart from "./ShoppingCart";

function NavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-bold md:hidden text-center bg-black text-white p-3">
        FakeStore
      </h1>
      <nav className="flex flex-col md:flex-row justify-between items-center gap-x-10 p-3 bg-black text-white sticky top-0">
        <h1 className="text-4xl font-bold hidden md:block">FakeStore</h1>
        <ul className="flex flex-row justify-around items-center gap-10 w-full md:justify-end">
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
          <li>
            <SignInSection />
          </li>
        </ul>
      </nav>
      <ShoppingCart isVisible={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default NavBar;
