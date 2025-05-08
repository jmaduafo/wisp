import React from "react";

function Header2({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return <h2 className={`text-2xl ${className}`}>{text}</h2>;
}

export default Header2;
