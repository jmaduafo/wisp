import { jsx as _jsx } from "react/jsx-runtime";
import { Cloud, Cloudy, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudMoon, CloudRain, CloudRainWind, CloudSnow, CloudSun, Snowflake, Sun, Moon, Divide, Equal, Minus, Plus, X, Delete, } from "lucide-react";
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
];
export const timerTask = ["Pomodoro", "Break"];
// calculator is in grid format
// outer: represents calculator buttons with a secondary color background
// inner: represents calculator buttons with a primary color background
// output: an action value or the javascript math operation to perform the calculation
// html: what is shown to the user once buttons are clicked
// either text or icon is displayed
export const calculator = [
    {
        category: "outer",
        text: "AC",
        icon: null,
        output: "delete",
        html: null,
    },
    {
        category: "outer",
        text: "+ / -",
        icon: null,
        output: "switch",
        html: null,
    },
    {
        category: "outer",
        text: "%",
        icon: null,
        output: "/100",
        html: "%",
    },
    {
        category: "outer",
        text: null,
        icon: _jsx(Divide, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "/",
        html: "÷",
    },
    {
        category: "inner",
        text: "7",
        icon: null,
        output: "7",
        html: "7",
    },
    {
        category: "inner",
        text: "8",
        icon: null,
        output: "8",
        html: "8",
    },
    {
        category: "inner",
        text: "9",
        icon: null,
        output: "9",
        html: "9",
    },
    {
        category: "outer",
        text: null,
        icon: _jsx(Plus, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "+",
        html: "+",
    },
    {
        category: "inner",
        text: "4",
        icon: null,
        output: "4",
        html: "4",
    },
    {
        category: "inner",
        text: "5",
        icon: null,
        output: "5",
        html: "5",
    },
    {
        category: "inner",
        text: "6",
        icon: null,
        output: "6",
        html: "6",
    },
    {
        category: "outer",
        text: null,
        icon: _jsx(Minus, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "-",
        html: "-",
    },
    {
        category: "inner",
        text: "1",
        icon: null,
        output: "1",
        html: "1",
    },
    {
        category: "inner",
        text: "2",
        icon: null,
        output: "2",
        html: "2",
    },
    {
        category: "inner",
        text: "3",
        icon: null,
        output: "3",
        html: "3",
    },
    {
        category: "outer",
        text: null,
        icon: _jsx(X, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "*",
        html: "×",
    },
    {
        category: "inner",
        text: "0",
        icon: null,
        output: "0",
        html: "0",
    },
    {
        category: "inner",
        text: ".",
        icon: null,
        output: ".",
        html: ".",
    },
    {
        category: "inner",
        text: null,
        icon: _jsx(Delete, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "backspace",
        html: null,
    },
    {
        category: "outer",
        text: null,
        icon: _jsx(Equal, { strokeWidth: 1, className: "w-[7vw] h-[7vw]" }),
        output: "=",
        html: "=",
    },
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
        return _jsx(CloudSnow, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code === 95) {
        return _jsx(CloudLightning, { strokeWidth: stroke, className: `${size}` });
    }
    else if (code >= 96 && code <= 99) {
        return _jsx(CloudHail, { strokeWidth: stroke, className: `${size}` });
    }
};
export const weatherForecast = (code) => {
    if (code >= 0 && code <= 1) {
        return "Clear sky";
    }
    else if (code === 2) {
        return "Partly cloudy";
    }
    else if (code === 3) {
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
    else if (code === 95) {
        return "Thunderstorm";
    }
    else if (code >= 96 && code <= 99) {
        return "Hail";
    }
};
const all_elements = [
    "water",
    "fire",
    "earth",
    "air",
    "energy",
    "mud",
    "rain",
    "pressure",
    "ocean",
    "volcano",
    "sea",
    "plant",
    "ocean",
    "lava",
    "brick",
    "dust",
    "geyser",
    "steam",
    "grass",
];
export const elements = [];
all_elements.forEach((element) => {
    elements.push({
        element: element.toLowerCase(),
        icon: `/images/element_icons/${element.toLowerCase()}.png`,
    });
});
export const gameCombinations = [
    {
        item1: "water",
        item2: "water",
        result: "sea",
    },
    {
        item1: "water",
        item2: "sea",
        result: "ocean",
    },
    {
        item1: "sea",
        item2: "sea",
        result: "ocean",
    },
    {
        item1: "water",
        item2: "fire",
        result: "steam",
    },
    {
        item1: "water",
        item2: "earth",
        result: "mud",
    },
    {
        item1: "water",
        item2: "air",
        result: "rain",
    },
    {
        item1: "fire",
        item2: "earth",
        result: "lava",
    },
    {
        item1: "fire",
        item2: "air",
        result: "energy",
    },
    {
        item1: "fire",
        item2: "mud",
        result: "brick",
    },
    {
        item1: "water",
        item2: "air",
        result: "rain",
    },
    {
        item1: "earth",
        item2: "earth",
        result: "pressure",
    },
    {
        item1: "earth",
        item2: "air",
        result: "dust",
    },
    {
        item1: "earth",
        item2: "rain",
        result: "plant",
    },
    {
        item1: "earth",
        item2: "plant",
        result: "grass",
    },
    // {
    //   item1: "fire",
    //   item2: "water",
    //   result: "steam",
    // },
    // {
    //   item1: "fire",
    //   item2: "earth",
    //   result: "lava",
    // },
];
