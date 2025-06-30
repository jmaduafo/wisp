import { jsx as _jsx } from "react/jsx-runtime";
import { SunMedium, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudHail, CloudRain, CloudSnow, CloudRainWind, CloudLightning, ThermometerSnowflake, CloudMoon, } from "lucide-react";
import SevenDay3 from "../components/pages/weather/day-7/SevenDay3";
import SevenDay2 from "../components/pages/weather/day-7/SevenDay2";
import SevenDay1 from "../components/pages/weather/day-7/SevenDay1";
import SevenDay4 from "../components/pages/weather/day-7/SevenDay4";
import ForecastDummy from "../components/pages/weather/ForecastDummy";
import AnalogDummy from "../components/pages/date-time/AnalogDummy";
export const weatherIcons = (code, is_day) => {
    // is_day === 1 => daytime; is_day === 0 => nighttime
    if (code === 0 && is_day === 1) {
        // clear sky
        return _jsx(SunMedium, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 0 && code <= 2 && is_day === 0) {
        return _jsx(CloudMoon, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 1 && code <= 2 && is_day === 1) {
        // partly cloudy
        return _jsx(CloudSun, { strokeWidth: 1, className: "w-full" });
    }
    else if (code === 3) {
        // cloudy
        return _jsx(Cloud, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 45 && code <= 48) {
        // fog
        return _jsx(CloudFog, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 51 && code <= 55) {
        // drizzle
        return _jsx(CloudDrizzle, { strokeWidth: 1, className: "w-full" });
    }
    else if ((code >= 56 && code <= 57) || (code >= 66 && code <= 67)) {
        // freezing drizzle
        return _jsx(CloudHail, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 61 && code <= 65) {
        // rain
        return _jsx(CloudRain, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 71 && code <= 77) {
        // snow
        return _jsx(ThermometerSnowflake, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 80 && code <= 82) {
        // rain showers
        return _jsx(CloudRainWind, { strokeWidth: 1, className: "w-full" });
    }
    else if (code >= 85 && code <= 86) {
        // snow showers
        return _jsx(CloudSnow, { strokeWidth: 1, className: "w-full" });
    }
    else if (code === 95 && code <= 99) {
        // thunderstorm
        return _jsx(CloudLightning, { strokeWidth: 1, className: "w-full" });
    }
};
export const dummy7Days = [
    {
        top_text: "Today",
        icon: 47,
        temp: 34
    },
    {
        top_text: "Wed",
        icon: 53,
        temp: 30
    },
    {
        top_text: "Thu",
        icon: 1,
        temp: 32
    },
];
export const dummy24Hours = [
    {
        top_text: "Now",
        icon: 3,
        temp: 22
    },
    {
        top_text: "11 AM",
        icon: 80,
        temp: 28
    },
    {
        top_text: "12 PM",
        icon: 52,
        temp: 30
    },
];
export const carouselData = [
    {
        category: "weather",
        sub_category: "day-7",
        title: "7-Day forecast",
        preview: ForecastDummy,
        widget: SevenDay1,
        is_glassomorphic: true,
        is_primary: true,
        serial_num: 1,
        data: dummy7Days
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        preview: ForecastDummy,
        widget: SevenDay2,
        is_glassomorphic: true,
        is_primary: false,
        serial_num: 2,
        data: dummy7Days
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        preview: ForecastDummy,
        widget: SevenDay3,
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 3,
        data: dummy7Days
    },
    {
        category: "weather",
        title: "7-Day forecast",
        sub_category: "day-7",
        preview: ForecastDummy,
        widget: SevenDay4,
        is_glassomorphic: false,
        is_primary: false,
        serial_num: 4,
        data: dummy7Days
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        preview: ForecastDummy,
        widget: SevenDay1,
        is_glassomorphic: true,
        is_primary: true,
        serial_num: 1,
        data: dummy24Hours
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        preview: ForecastDummy,
        widget: SevenDay2,
        is_glassomorphic: true,
        is_primary: false,
        serial_num: 2,
        data: dummy24Hours
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        preview: ForecastDummy,
        widget: SevenDay3,
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 3,
        data: dummy24Hours
    },
    {
        category: "weather",
        title: "24-Hour forecast",
        sub_category: "hour-24",
        preview: ForecastDummy,
        widget: SevenDay4,
        is_glassomorphic: false,
        is_primary: false,
        serial_num: 4,
        data: dummy24Hours
    },
    {
        category: "weather",
        title: "Current",
        sub_category: "current",
        preview: ForecastDummy,
        widget: SevenDay1,
        is_glassomorphic: false,
        is_primary: true,
        serial_num: 4,
    },
    {
        category: "date-time",
        title: "Time",
        sub_category: "time",
        preview: AnalogDummy,
        widget: SevenDay1,
        is_glassomorphic: true,
        is_primary: true,
        serial_num: 1,
    },
];
