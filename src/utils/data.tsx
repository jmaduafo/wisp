import {
  Cloud,
  Cloudy,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Snowflake,
  Sun,
  Moon,
} from "lucide-react";

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const color_themes = [
    {
        title: "maple",
        primary: "#A65858",
        secondary: "#FEDBCD",
    },
    {
        title: "chrome",
        primary: "#1E1E1E",
        secondary: "#FFF8F8",
    },
    {
        title: "flush",
        primary: "#5C6D70",
        secondary: "#FFD2BE",
    },
    {
        title: "lavish",
        primary: "#ADA8B6",
        secondary: "#FFEEDB",
    },
    {
        title: "spots",
        primary: "#FFEEDB",
        secondary: "#1E1E1E",
    },
    
]

export const weatherIcon = (
  code: number,
  is_day: number,
  size: string,
  stroke: number
) => {
  if (code === 0 && is_day === 0) {
    return <Moon strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 0 && is_day === 1) {
    return <Sun strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 1 && is_day === 0) {
    return <CloudMoon strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 1 && is_day === 1) {
    return <CloudSun strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 2) {
    return <Cloud strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 3) {
    return <Cloudy strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 45 && code <= 48) {
    return <CloudFog strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 51 && code <= 57) {
    return <CloudDrizzle strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 61 && code <= 65) {
    return <CloudRain strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 66 && code <= 67) {
    return <CloudHail strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 71 && code <= 75) {
    return <CloudSnow strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 77) {
    return <Snowflake strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 80 && code <= 82) {
    return <CloudRainWind strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 85 && code <= 86) {
    return <CloudSnow strokeWidth={stroke} className={`${size}`} />;
  } else if (code === 95) {
    return <CloudLightning strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 96 && code <= 99) {
    return <CloudHail strokeWidth={stroke} className={`${size}`} />;
  }
};

export const weatherForecast = (code: number) => {
  if (code >= 0 && code <= 1) {
    return "Clear sky";
  } else if (code === 2) {
    return "Partly cloudy";
  } else if (code === 3) {
    return "Cloudy";
  } else if (code >= 45 && code <= 48) {
    return "Fog";
  } else if (code >= 51 && code <= 57) {
    return "Drizzle";
  } else if (code >= 61 && code <= 67) {
    return "Rain";
  } else if (code >= 71 && code <= 77) {
    return "Snow";
  } else if (code >= 80 && code <= 82) {
    return "Rain showers";
  } else if (code >= 85 && code <= 86) {
    return "Snow showers";
  } else if (code === 95) {
    return "Thunderstorm";
  } else if (code >= 96 && code <= 99) {
    return "Hail";
  }
};
