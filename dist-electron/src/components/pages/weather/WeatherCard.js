import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { weatherIcon } from "@/utils/data";
import { isToday } from "@/utils/weather";
function WeatherCard({ day }) {
    return (_jsxs("div", { className: `w-[20vw] h-[30vh] ${isToday(day) ? "bg-white/30" : "bg-white/15"} rounded-lg p-0.5 flex flex-col justify-between items-center`, children: [_jsx("p", { className: "text-[4.5vw] font-light", children: "Tue" }), _jsx("div", { className: "", children: weatherIcon(2, 0, "w-[9vw] h-[9vw]", 1) }), _jsx("p", { className: "text-[4.5vw] font-light", children: "78 \u00B0" })] }));
}
export default WeatherCard;
