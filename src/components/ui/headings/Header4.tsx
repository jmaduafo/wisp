import React from 'react'

function Header4({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return (
    <h4 className={`text-base ${className}`}>{text}</h4>
  )
}

export default Header4