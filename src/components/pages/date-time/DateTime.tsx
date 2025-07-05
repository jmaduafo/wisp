import Widget from "@/components/ui/widget/Widget";
import React from "react";

function DateTime() {
  return (
    <Widget>
      <div className="p-3">
        <div className="p-2 flex gap-2 items-start justify-center rounded-md bg-white/20">
          <h1 className="elegant text-[30vw] leading-[1]">9<span className="animate-pulse">:</span>30</h1>
          <p className="elegant text-[7vw]">AM</p>
        </div>
        <div className="">
          {
            [9,]
          }
        </div>
      </div>
    </Widget>
  );
}

export default DateTime;
