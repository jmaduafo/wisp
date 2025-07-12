import React from "react";

function Widget({
  children,
  className,
  padding,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly padding?: string;
}) {
  return (
    <div className="relative h-full overflow-y-hidden">
      <div className="absolute drag bg-transparent w-full h-[22.5px] -z-1" />
      <div className={`${padding ?? "pt-2 px-3 pb-[12vh]"} ${className} h-full`}>
        {children}
      </div>
    </div>
  );
}

export default Widget;
