import React from "react";
import firebaseApi from "../services/firebaseApi";
import { useContext, useEffect, useState } from "react";
import { User } from "@firebase/auth";

interface AuthContextInterface {
  user: User | null;
  isUserSignedIn: boolean;
}

const AuthContext = React.createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: JSX.Element;
}

function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    firebaseApi.onAuthStateChanged(async (user) => {
      if (firebaseApi.isUserSignedIn()) {
        setLoading(true);
        setUser(user);
        setLoading(false);
        setIsUserSignedIn(true);
      } else {
        setUser(null);
        setIsUserSignedIn(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserSignedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
