import React from "react";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[8vw] h-[8vw] rounded-full border-2 border-transparent border-t-white animate-spin"></div>
    </div>
  );
}

export default Loading;
