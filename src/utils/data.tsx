import React from "react";
import {
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudRain,
  CloudSnow,
  CloudRainWind,
  CloudLightning,
  ThermometerSnowflake,
  CloudMoon,
} from "lucide-react";
import { Widget } from "../types/types";
import SevenDummy1 from "../components/pages/weather/day-7/SevenDummy1";
import SevenDummy2 from "../components/pages/weather/day-7/SevenDummy2";
import SevenDummy3 from "../components/pages/weather/day-7/SevenDummy3";
import HourDummy1 from "../components/pages/weather/hour-24/HourDummy1";
import HourDummy2 from "../components/pages/weather/hour-24/HourDummy2";
import HourDummy3 from "../components/pages/weather/hour-24/HourDummy3";
import HourDummy4 from "../components/pages/weather/hour-24/HourDummy4";
import SevenDummy4 from "../components/pages/weather/day-7/SevenDummy4";

export const weatherIcons = (code: number, is_day: number) => {
    // is_day === 1 => daytime; is_day === 0 => nighttime
  if (code === 0 && is_day === 1) {
    // clear sky
    return <SunMedium strokeWidth={1} className="w-full" />;
  } else if (code >= 0 && code <= 2 && is_day === 0) {
    return <CloudMoon strokeWidth={1} className="w-full" />;
  } else if (code >= 1 && code <= 2 && is_day === 1) {
    // partly cloudy
    return <CloudSun strokeWidth={1} className="w-full" />;
  } else if (code === 3) {
    // cloudy
    return <Cloud strokeWidth={1} className="w-full" />;
  } else if (code >= 45 && code <= 48) {
    // fog
    return <CloudFog strokeWidth={1} className="w-full" />;
  } else if (code >= 51 && code <= 55) {
    // drizzle
    return <CloudDrizzle strokeWidth={1} className="w-full" />;
  } else if ((code >= 56 && code <= 57) || (code >= 66 && code <= 67)) {
    // freezing drizzle
    return <CloudHail strokeWidth={1} className="w-full" />;
  } else if (code >= 61 && code <= 65) {
    // rain
    return <CloudRain strokeWidth={1} className="w-full" />;
  } else if (code >= 71 && code <= 77) {
    // snow
    return <ThermometerSnowflake strokeWidth={1} className="w-full" />;
  } else if (code >= 80 && code <= 82) {
    // rain showers
    return <CloudRainWind strokeWidth={1} className="w-full" />;
  } else if (code >= 85 && code <= 86) {
    // snow showers
    return <CloudSnow strokeWidth={1} className="w-full" />;
  } else if (code === 95 && code <= 99) {
    // thunderstorm
    return <CloudLightning strokeWidth={1} className="w-full" />;
  }
};

export const dummy7Days = [
    {
        day: "Tue",
        icon: 47,
        temp: 34
    },
    {
        day: "Wed",
        icon: 53,
        temp: 30
    },
    {
        day: "Thu",
        icon: 1,
        temp: 32
    },
]

export const dummy24Hours = [
    {
        day: "10 AM",
        icon: 3,
        temp: 22
    },
    {
        day: "11 AM",
        icon: 80,
        temp: 28
    },
    {
        day: "12 PM",
        icon: 52,
        temp: 30
    },
]


export const carouselData : Widget[] = [
    {
        category: "weather",
        sub_category: "day-7",
        title: "7-Day forecast",
        demo: <SevenDummy1/>,
        widget: "",
        is_glassomorphic: true,
        is_primary: true,
        serial_num: 1,
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        demo: <SevenDummy2/>,
        widget: "",
        is_glassomorphic: true,
        is_primary: false,
        serial_num: 2,
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        demo: <SevenDummy3/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 3,
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        demo: <SevenDummy4/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: false,
        serial_num: 4,
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        demo: <HourDummy1/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 1,
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        demo: <HourDummy2/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 2,
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        demo: <HourDummy3/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 3,
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        demo: <HourDummy4/>,
        widget: "",
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 4,
    },
]