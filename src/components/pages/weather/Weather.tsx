import React from "react";
import { ChartNoAxesCombined, ChartNoAxesColumn, SunSnow } from "lucide-react";
import Display from "../../ui/menu/Display";
import { Nav } from "../../../types/types";

function Weather() {
  // default, 24 hour forecast, forecast,
  const weather: Nav[] = [
    {
      title: "Current",
      navLink: "weather/current",
      icon: <SunSnow className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "24hr Forecast",
      navLink: "weather/hour-24",
      icon: <ChartNoAxesColumn className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "7-day Forecast",
      navLink: "weather/day-7",
      icon: <ChartNoAxesCombined className="w-7 h-7" strokeWidth={1} />,
    },
  ];

  return (
    <Display text="Weather" array={weather}/>
  );
}

export default Weather;
