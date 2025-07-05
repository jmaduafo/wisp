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

export const weatherIcon = (code: number, is_day: number, size: string, stroke: number) => {
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
    return <CloudHail strokeWidth={stroke} className={`${size}`} />;
  } else if (code >= 95 && code <= 99) {
    return <CloudLightning strokeWidth={stroke} className={`${size}`} />;
  }
};
