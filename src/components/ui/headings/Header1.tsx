import React from "react";

function Header1({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return <h1 className={`text-2xl ${className}`}>{text}</h1>;
}

export default Header1;
