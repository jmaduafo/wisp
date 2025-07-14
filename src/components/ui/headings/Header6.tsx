import React from 'react'

function Header6({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return (
    <h6 className={`text-xs ${className}`}>{text}</h6>
  )
}

export default Header6