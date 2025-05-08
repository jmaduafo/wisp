import React from "react";
import { Minus, X } from "lucide-react";

function Controls() {
  return (
    <div className="flex">
      <div className="flex-1 drag"></div>
      <div className="flex items-center gap-2 p-1">
        <button className="cursor-pointer">
          <Minus strokeWidth={1} />
        </button>
        <button className="cursor-pointer">
          <X strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

export default Controls;
