import { jsx as _jsx } from "react/jsx-runtime";
import { ChartNoAxesCombined, ChartNoAxesColumn, SunSnow } from "lucide-react";
function Weather() {
    // default, 24 hour forecast, forecast,
    const weather = [
        {
            title: "Current",
            navLink: "weather/current",
            icon: _jsx(SunSnow, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "24hr Forecast",
            navLink: "weather/hour-24",
            icon: _jsx(ChartNoAxesColumn, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "7-day Forecast",
            navLink: "weather/day-7",
            icon: _jsx(ChartNoAxesCombined, { className: "w-7 h-7", strokeWidth: 1 }),
        },
    ];
    return (_jsx("div", { children: "Hamburger" }));
}
export default Weather;
