import React from "react";

import ProfileImage from "./ui/ProfileImage";
import SignInButton from "./SignInButton";
import Button from "./ui/Button";
import { useSignOutUser } from "../hooks/firebaseHooks";
import { useAuth } from "../context/AuthContext";

function SignInSection() {
  const { user, isUserSignedIn } = useAuth();
  const { mutate: signOutUser, isLoading: isSigningOut } = useSignOutUser();

  if (isSigningOut) {
    return (
      <>
        <Button
          className="bg-white !text-black"
          disabled={true}
          onClick={(e) => {}}
        >
          Signing out...
        </Button>
      </>
    );
  } else if (isUserSignedIn) {
    return (
      <>
        <button
          className="flex flex-col items-center justify-center gap-2 text-center md:flex-row"
          onClick={(e) => {
            signOutUser();
          }}
        >
          <ProfileImage
            src={user?.photoURL || ""}
            alt="Profile picture"
          ></ProfileImage>
          <p className="hidden md:block">{user?.displayName || ""}</p>
        </button>
      </>
    );
  } else {
    return (
      <>
        <SignInButton className="bg-white !text-black" />
      </>
    );
  }
}

export default SignInSection;
