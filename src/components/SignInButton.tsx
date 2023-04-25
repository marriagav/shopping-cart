import { useSignInWithGoogle } from "../hooks/firebaseHooks";
import Button from "./ui/Button";
import { useEffect } from "react";

interface SignInButtonProps {
  className?: string;
}

function SignInButton(props: SignInButtonProps) {
  const { mutate, isLoading, error, isError } = useSignInWithGoogle();

  const handleSignIn = () => {
    mutate();
  };

  useEffect(() => {
    // if (isError) {
    //   console.log(isError);
    //   console.log(error);
    // }
  }, [isError, error]);

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className={props.className}
    >
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
}

export default SignInButton;
