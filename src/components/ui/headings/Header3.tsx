import React from 'react'

function Header3({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return (
    <h3 className={`text-lg ${className}`}>{text}</h3>
  )
}

export default Header3