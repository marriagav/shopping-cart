import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex flex-row justify-around items-center gap-10 p-6 bg-black text-white">
      <h1 className="text-4xl font-bold">FakeStore</h1>
      <ul className="flex flex-row justify-center items-center gap-10">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
