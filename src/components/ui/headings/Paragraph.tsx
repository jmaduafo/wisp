import React from 'react'

function Paragraph({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  return (
    <p className={`text-[13.5px] ${className}`}>{text}</p>
  )
}

export default Paragraph