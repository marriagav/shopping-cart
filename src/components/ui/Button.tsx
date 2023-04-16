import React from "react";

interface ButtonProps {
  onClick: (e: any) => void;
  children: React.ReactNode;
  className?: string;
}

function Button(props: ButtonProps) {
  const classes = `
    bg-black
    text-white
    font-bold
    p-3
    w-full
    rounded-lg
    margin-3
    ${props.className ?? ""}
  `;
  return (
    <button className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
