import Widget from "@/components/ui/widget/Widget";
import React from "react";

function DateTime() {
  return (
    <Widget>
      <div className="flex gap-3 h-full">
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="elegant text-[40vw] leading-[.7]">09</p>
          <p className="elegant text-[40vw] leading-[.7]">34</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <div className="w-[40vw] h-[40vw] rounded-full bg-white">

          </div>
          <div>
            <h2 className="text-center leading-[1] font-light text-[7vw]">Sunday,</h2>
            <h3 className="text-center leading-[1] font-light text-[6vw]">Dec. 23, 2025</h3>
          </div>
        </div>
      </div>
    </Widget>
  );
}

export default DateTime;
