import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherIcon } from "@/utils/data";
function Weather() {
    const [isCelsius, setIsCelsius] = useState(true);
    return (_jsxs(Widget, { children: [_jsxs("div", { className: "flex justify-end gap-2.5 items-end", children: [_jsx("button", { onClick: () => setIsCelsius(true), className: `${isCelsius ? "text-[5vw] opacity-100" : "text-[4.3vw] opacity-50"} leading-[1] cursor-pointer`, children: "C" }), _jsx("button", { onClick: () => setIsCelsius(false), className: `${isCelsius ? "text-[4.3vw] opacity-50" : "text-[5vw] opacity-100"} leading-[1] cursor-pointer`, children: "F" })] }), _jsxs("div", { className: "flex items-start justify-center gap-3 mt-3", children: [weatherIcon(46, 1, "w-[18vw] h-[18vw]", 1.5), _jsxs("div", { children: [_jsxs("div", { className: "flex items-end gap-2", children: [_jsxs("div", { className: "flex items-start", children: [_jsx("h1", { className: "elegant text-[23vw] leading-[.8]", children: "90" }), _jsx("h3", { className: "elegant text-[15vw] leading-[1]", children: "\u00B0" })] }), _jsx("div", { children: _jsx("p", { className: "text-[3.8vw] opacity-75 font-light", children: "87 \u00B0 | 92 \u00B0" }) })] }), _jsxs("div", { className: "font-light", children: [_jsx("p", { className: "text-[4.5vw] leading-[1]", children: "San Francisco" }), _jsx("p", { className: "text-[4vw] opacity-70 leading-[1]", children: "Cloudy" })] })] })] }), _jsx("div", { className: "" })] }));
}
export default Weather;
