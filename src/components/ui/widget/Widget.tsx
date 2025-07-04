import React from "react";

function Widget({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-2xl">
      <div className="drag bg-black/90 w-full h-[22.5px]" />
      <div className="">{children}</div>
    </div>
  );
}

export default Widget;
