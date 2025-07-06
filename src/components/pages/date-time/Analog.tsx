import React from "react";

type Time = {
  readonly hourDeg: number | undefined;
  readonly minDeg: number | undefined;
};

function Analog({ hourDeg, minDeg }: Time) {
  return (
    <div className="relative w-[40vw] h-[40vw] rounded-full bg-white text-red-300">
      {/* ANALOG NUMBER POINTS */}
      <div className="p-[0.8vw] w-full h-full rounded-full flex flex-col justify-between">
        <div className="flex justify-center">
          <p className="text-[4.2vw]">12</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[1vw]">
            <div className="bg-red-300 h-[0.4vw] w-[4vh] rounded-full"></div>
            <p className="text-[4.2vw]">9</p>
          </div>
          <div className="w-[1.3vw] h-[1.3vw] bg-red-300 rounded-full"></div>
          <div className="flex items-center gap-[1vw]">
            <p className="text-[4.2vw]">3</p>
            <div className="bg-red-300 h-[0.4vw] w-[4vh] rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[4.2vw]">6</p>
        </div>
      </div>
      {/* HOUR */}
      <div
        className={`w-[0.4vw] h-[10vh] absolute top-1/2 left-1/2 transform origin-top bg-red-300 rounded-full`}
        style={{ rotate: hourDeg ? `${hourDeg + 180}deg` : `180deg` }}
      ></div>
      {/* MINUTE */}
      <div
        className={`w-[0.4vw] h-[15vh] absolute top-1/2 left-1/2 transform origin-top bg-red-300 rounded-full`}
        style={{ rotate: minDeg ? `${minDeg + 180}deg` : `180deg` }}
      ></div>
    </div>
  );
}

export default Analog;
