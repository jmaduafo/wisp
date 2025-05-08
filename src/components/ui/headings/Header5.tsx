import React from "react";

function Header5({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return <h5 className={`text-base ${className}`}>{text}</h5>;
}

export default Header5;
