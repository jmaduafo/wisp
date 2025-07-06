import { jsx as _jsx } from "react/jsx-runtime";
import { Cloud, Cloudy, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudMoon, CloudRain, CloudRainWind, CloudSnow, CloudSun, Snowflake, Sun, Moon, } from "lucide-react";
export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export const weatherIcon = (code, is_day, size, stroke) => {
    if (code === 0 && is_day === 0) {
        return _jsx(Moon, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 0 && is_day === 1) {
        return _jsx(Sun, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 1 && is_day === 0) {
        return _jsx(CloudMoon, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 1 && is_day === 1) {
        return _jsx(CloudSun, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 2) {
        return _jsx(Cloud, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 3) {
        return _jsx(Cloudy, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 45 && code <= 48) {
        return _jsx(CloudFog, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 51 && code <= 57) {
        return _jsx(CloudDrizzle, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 61 && code <= 65) {
        return _jsx(CloudRain, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 66 && code <= 67) {
        return _jsx(CloudHail, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 71 && code <= 75) {
        return _jsx(CloudSnow, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 77) {
        return _jsx(Snowflake, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 80 && code <= 82) {
        return _jsx(CloudRainWind, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 85 && code <= 86) {
        return _jsx(CloudHail, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 95 && code <= 99) {
        return _jsx(CloudLightning, { strokeWidth: stroke, className: `${size}` });
    }
};
export const weatherForecast = (code) => {
    if (code >= 0 && code <= 1) {
        return "Clear sky";
    }
    else if (code >= 2 && code <= 3) {
        return "Cloudy";
    }
    else if (code >= 45 && code <= 48) {
        return "Fog";
    }
    else if (code >= 51 && code <= 57) {
        return "Drizzle";
    }
    else if (code >= 61 && code <= 67) {
        return "Rain";
    }
    else if (code >= 71 && code <= 77) {
        return "Snow";
    }
    else if (code >= 80 && code <= 82) {
        return "Rain showers";
    }
    else if (code >= 85 && code <= 86) {
        return "Snow showers";
    }
    else if (code >= 95 && code <= 99) {
        return "Thunderstorms";
    }
};
