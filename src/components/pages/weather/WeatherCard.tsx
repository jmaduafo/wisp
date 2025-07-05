import React from "react";
import { weatherIcon } from "@/utils/data";
import { isToday } from "@/utils/weather";

type Weather = {
    readonly day: string;
    readonly code: number;
    readonly temp: number;
    readonly today: string;
}

function WeatherCard({ day, code, temp, today }: Weather) {
    // ${isToday(day) ? "bg-white/30" : "bg-white/15"}
  return (
    <div className={`w-[20vw] h-[30vh] ${isToday(today) ? "bg-white/30" : "bg-white/15"} rounded-lg p-0.5 flex flex-col justify-between items-center`}>
      {/* DAY */}
      <p className="text-[4.5vw] font-light">{day}</p>
      {/* WEATHER ICON */}
      <div className="">{weatherIcon(code, 1, "w-[9vw] h-[9vw]", 1)}</div>
      {/* HIGHEST TEMP */}
      <p className="text-[4.5vw] font-light">{temp} &deg;</p>
    </div>
  );
}

export default WeatherCard;
