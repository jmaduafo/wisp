import React from "react";

function Widget({
  children,
  className,
  padding_bottom,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly padding_bottom?: string;
}) {
  return (
    <div className="relative h-full overflow-y-hidden">
      <div className="absolute drag bg-red-300 w-full h-[22.5px] -z-1" />
      <div className={`pt-2 px-3 ${padding_bottom ?? "pb-[12vh]"} ${className} h-full`}>
        {children}
      </div>
    </div>
  );
}

export default Widget;
