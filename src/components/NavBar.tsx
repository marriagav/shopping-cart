import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "./ShoppingCart";
import Button from "./ui/Button";
import ProfileImage from "./ui/ProfileImage";
import {
  signInWithGoogle,
  getProfilePicUrl,
  isUserSignedIn,
  getProfileName,
  auth,
  signOutUser,
} from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profileName, setProfileName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (isUserSignedIn()) {
        setProfilePicUrl(await getProfilePicUrl());
        setProfileName(getProfileName());
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        setProfilePicUrl(await getProfilePicUrl());
        setProfileName(getProfileName());
      }
    });
  }, []);
  return (
    <>
      <nav className="flex flex-col md:flex-row justify-between items-center gap-x-10 p-6 bg-black text-white">
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
          {isSignedIn && (
            <li>
              <button
                className="flex flex-col items-center justify-center gap-2 text-center md:flex-row"
                onClick={(e) => {
                  signOutUser();
                }}
              >
                <ProfileImage
                  src={profilePicUrl}
                  alt="Profile picture"
                ></ProfileImage>
                <p>{profileName}</p>
              </button>
            </li>
          )}
          {!isSignedIn && (
            <li>
              <Button
                onClick={(e) => {
                  signInWithGoogle();
                }}
                className="bg-white !text-black "
              >
                {"Sign In"}
              </Button>
            </li>
          )}
        </ul>
      </nav>
      <ShoppingCart isVisible={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default NavBar;
