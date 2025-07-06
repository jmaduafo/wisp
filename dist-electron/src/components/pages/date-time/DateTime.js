import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { fullDate, fullTime } from "@/utils/dateTime";
import { useEffect, useState } from "react";
function DateTime() {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [day, setDay] = useState("--");
    const [display, setDisplay] = useState("-----");
    useEffect(() => {
        const time = setInterval(() => {
            setHours(fullTime().hours);
            setMinutes(fullTime().minutes);
            setDay(fullDate().day);
            setDisplay(fullDate().display);
        }, 1000);
        return () => clearInterval(time);
    }, []);
    return (_jsx(Widget, { children: _jsxs("div", { className: "flex gap-3 h-full", children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center", children: [_jsx("p", { className: "elegant text-[40vw] leading-[.7]", children: hours }), _jsx("p", { className: "elegant text-[40vw] leading-[.7]", children: minutes })] }), _jsxs("div", { className: "flex-1 flex flex-col justify-center items-center gap-3", children: [_jsx("div", { className: "w-[40vw] h-[40vw] rounded-full bg-white" }), _jsxs("div", { children: [_jsxs("h2", { className: "text-center leading-[1] font-light text-[7vw]", children: [day, ","] }), _jsx("h3", { className: "text-center leading-[1] font-light text-[6vw] mt-0.5", children: display })] })] })] }) }));
}
export default DateTime;
