import React from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
}

function ProfileImage(props: ProfileImageProps) {
  const classes = `
    rounded-full
    h-10
    w-10
    ${props.className ?? ""}
  `;
  return (
    <img className={classes} src={props.src} alt={props.alt}>
      {props.children}
    </img>
  );
}

export default ProfileImage;
