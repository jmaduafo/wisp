import { Alchemy, AlchemyCollection } from "@/types/types";
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
  Divide,
  Equal,
  Minus,
  Plus,
  X,
  Delete,
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
    icon: <Divide strokeWidth={1} className="w-[7vw] h-[7vw]" />,
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
    icon: <Plus strokeWidth={1} className="w-[7vw] h-[7vw]" />,
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
    icon: <Minus strokeWidth={1} className="w-[7vw] h-[7vw]" />,
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
    icon: <X strokeWidth={1} className="w-[7vw] h-[7vw]" />,
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
    icon: <Delete strokeWidth={1} className="w-[7vw] h-[7vw]" />,
    output: "backspace",
    html: null,
  },
  {
    category: "outer",
    text: null,
    icon: <Equal strokeWidth={1} className="w-[7vw] h-[7vw]" />,
    output: "=",
    html: "=",
  },
];

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

const all_elements = [
  "water",
  "fire",
  "earth",
  "air",
  "energy",
  "mud",
  "rain",
  "pressure",
  "wave",
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
  "earthquake",
  "flower",
  "sky",
  "stone",
  "wind",
  "cloud",
  "lightning",
  "seaweed",
  "beach",
  "algae",
  "bird",
  "bouquet",
  "cactus",
  "clay",
  "coal",
  "desert",
  "diamond",
  "egg",
  "explosion",
  "flood",
  "fog",
  "foundation",
  "garden",
  "glass",
  "gunpowder",
  "house",
  "island",
  "life",
  "metal",
  "mountain",
  "pottery",
  "sand",
  "seaweed",
  "stone",
  "sun",
  "swamp",
  "tobacco",
  "tsunami"

];

export const elements: Alchemy[] = [];

all_elements.forEach((element) => {
  elements.push({
    element: element.toLowerCase(),
    icon: `/images/element_icons/${element.toLowerCase()}.png`,
  });
});

const combo_list = [
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
    item1: "water",
    item2: "cloud",
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
    item2: "steam",
    result: "geyser",
  },
  {
    item1: "earth",
    item2: "lava",
    result: "volcano",
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
  {
    item1: "plant",
    item2: "rain",
    result: "flower",
  },
  {
    item1: "earth",
    item2: "energy",
    result: "earthquake",
  },
  {
    item1: "air",
    item2: "cloud",
    result: "sky",
  },
  {
    item1: "air",
    item2: "steam",
    result: "cloud",
  },
  {
    item1: "air",
    item2: "lava",
    result: "stone",
  },
  {
    item1: "air",
    item2: "pressure",
    result: "wind",
  },
  {
    item1: "sea",
    item2: "wind",
    result: "wave",
  },
  {
    item1: "sea",
    item2: "plant",
    result: "seaweed",
  },
  {
    item1: "sea",
    item2: "sand",
    result: "beach",
  },
  {
    item1: "ocean",
    item2: "sand",
    result: "beach",
  },
  {
    item1: "cloud",
    item2: "energy",
    result: "lightning",
  },
  {
    item1: "brick",
    item2: "brick",
    result: "foundation",
  },
  {
    item1: "foundation",
    item2: "brick",
    result: "house",
  },
  {
    item1: "air",
    item2: "stone",
    result: "sand",
  },
  {
    item1: "earth",
    item2: "earthquake",
    result: "mountain",
  },
  {
    item1: "fire",
    item2: "plant",
    result: "tobacco",
  },
  {
    item1: "fire",
    item2: "dust",
    result: "gunpowder",
  },
  {
    item1: "fire",
    item2: "gunpowder",
    result: "explosion",
  },
  {
    item1: "pressure",
    item2: "plant",
    result: "coal",
  },
  {
    item1: "pressure",
    item2: "coal",
    result: "diamond",
  },
  {
    item1: "cloud",
    item2: "earth",
    result: "fog",
  },
  {
    item1: "rain",
    item2: "rain",
    result: "flood",
  },
  {
    item1: "wind",
    item2: "sand",
    result: "desert",
  },
  {
    item1: "plant",
    item2: "plant",
    result: "garden",
  },
  {
    item1: "flower",
    item2: "flower",
    result: "bouquet",
  },
  {
    item1: "cloud",
    item2: "earth",
    result: "fog",
  },
  {
    item1: "plant",
    item2: "desert",
    result: "cactus",
  },
  {
    item1: "plant",
    item2: "grass",
    result: "garden",
  },
  {
    item1: "sand",
    item2: "sand",
    result: "desert",
  },
  {
    item1: "mud",
    item2: "plant",
    result: "swamp",
  },
  {
    item1: "mud",
    item2: "sand",
    result: "clay",
  },
  {
    item1: "clay",
    item2: "fire",
    result: "pottery",
  },
  {
    item1: "energy",
    item2: "swamp",
    result: "life",
  },
  {
    item1: "ocean",
    item2: "volcano",
    result: "island",
  },
  {
    item1: "ocean",
    item2: "sand",
    result: "beach",
  },
  {
    item1: "ocean",
    item2: "earthquake",
    result: "tsunami",
  },
  {
    item1: "sky",
    item2: "fire",
    result: "sun",
  },
  {
    item1: "sky",
    item2: "life",
    result: "bird",
  },
  {
    item1: "plant",
    item2: "water",
    result: "algae",
  },
  {
    item1: "sand",
    item2: "fire",
    result: "glass",
  },
  {
    item1: "air",
    item2: "lava",
    result: "stone",
  },
  {
    item1: "stone",
    item2: "fire",
    result: "metal",
  },
];


export const gameCombinations: AlchemyCollection[] = []

combo_list.forEach((item, i) => {
  gameCombinations.push({ ...item, id: i + 1 })
})