import React from "react";

function Widget({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute drag bg-red-300 w-full h-[22.5px] -z-1" />
      <div className="py-2 px-3">{children}</div>
    </div>
  );
}

export default Widget;
