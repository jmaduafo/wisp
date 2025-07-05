import React, { useState } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherIcon } from "@/utils/data";

function Weather() {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <Widget>
      <div className="flex justify-end gap-2.5 items-end">
        <button
          onClick={() => setIsCelsius(true)}
          className={`${
            isCelsius ? "text-[5vw] opacity-100" : "text-[4.3vw] opacity-50"
          } leading-[1] cursor-pointer`}
        >
          C
        </button>
        <button
          onClick={() => setIsCelsius(false)}
          className={`${
            isCelsius ? "text-[4.3vw] opacity-50" : "text-[5vw] opacity-100"
          } leading-[1] cursor-pointer`}
        >
          F
        </button>
      </div>
      <div className="flex items-start justify-center gap-3 mt-3">
        {weatherIcon(46, 1, "w-[18vw] h-[18vw]", 1.5)}
        <div>
          <div className="flex items-end gap-2">
            <div className="flex items-start">
              <h1 className="elegant text-[23vw] leading-[.8]">90</h1>
              <h3 className="elegant text-[15vw] leading-[1]">&deg;</h3>
            </div>
            <div>
              <p className="text-[3.8vw] opacity-75 font-light">87 &deg; | 92 &deg;</p>
            </div>
          </div>
          <div className="font-light">
            <p className="text-[4.5vw] leading-[1]">San Francisco</p>
            <p className="text-[4vw] opacity-70 leading-[1]">Cloudy</p>
          </div>
        </div>
      </div>
      <div className="">
        
      </div>
    </Widget>
  );
}

export default Weather;
