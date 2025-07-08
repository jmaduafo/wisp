import { useAuth } from "@/context/AuthContext";
import React from "react";

type Time = {
  readonly hourDeg: number | undefined;
  readonly minDeg: number | undefined;
  readonly secDeg: number | undefined;
};

function Analog({ hourDeg, minDeg, secDeg }: Time) {
  const { userData } = useAuth();

  return (
    <div
      className="relative w-[40vw] h-[40vw] rounded-full"
      style={{
        color: userData ? userData.primary_color : "#F7EAE4",
        backgroundColor: userData ? userData.secondary_color : "#2D2929",
      }}
    >
      {/* ANALOG NUMBER POINTS */}
      <div className="p-[0.8vw] w-full h-full rounded-full flex flex-col justify-between">
        <div className="flex justify-center">
          <p className="text-[4.2vw]">12</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[1vw]">
            <div
              className="h-[0.4vw] w-[4vh] rounded-full"
              style={{
                backgroundColor: userData ? userData.primary_color : "#F7EAE4",
              }}
            ></div>
            <p className="text-[4.2vw]">9</p>
          </div>
          <div
            className="w-[1.3vw] h-[1.3vw] rounded-full"
            style={{
              backgroundColor: userData ? userData.primary_color : "#F7EAE4",
            }}
          ></div>
          <div className="flex items-center gap-[1vw]">
            <p className="text-[4.2vw]">3</p>
            <div
              className="h-[0.4vw] w-[4vh] rounded-full"
              style={{
                backgroundColor: userData ? userData.primary_color : "#F7EAE4",
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[4.2vw]">6</p>
        </div>
      </div>
      {/* HOUR */}
      <div
        className={`w-[0.4vw] h-[11vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`}
        style={{
          rotate: hourDeg ? `${hourDeg + 180}deg` : `180deg`,
          backgroundColor: userData ? userData.primary_color : "#F7EAE4",
        }}
      ></div>
      {/* MINUTE */}
      <div
        className={`w-[0.4vw] h-[17.5vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`}
        style={{
          rotate: minDeg ? `${minDeg + 180}deg` : `180deg`,
          backgroundColor: userData ? userData.primary_color : "#F7EAE4",
        }}
      ></div>
      {/* SECOND */}
      <div
        className={`w-[0.25vw] h-[17.5vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`}
        style={{
          rotate: secDeg ? `${secDeg + 180}deg` : `180deg`,
          backgroundColor: userData ? userData.primary_color : "#F7EAE4",
        }}
      ></div>
    </div>
  );
}

export default Analog;
