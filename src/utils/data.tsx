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
