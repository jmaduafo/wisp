import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { analogTime, fullDate, fullTime } from "@/utils/dateTime";
import { useEffect, useState } from "react";
import Analog from "./Analog";
function DateTime() {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [day, setDay] = useState("--");
    const [display, setDisplay] = useState("-----");
    const [hourDeg, setHourDeg] = useState();
    const [minDeg, setMinDeg] = useState();
    const [secDeg, setSecDeg] = useState();
    useEffect(() => {
        const time = setInterval(() => {
            setHours(fullTime().hours);
            setMinutes(fullTime().minutes);
            setDay(fullDate().day);
            setDisplay(fullDate().display);
            setHourDeg(analogTime().hours);
            setMinDeg(analogTime().minutes);
            setSecDeg(analogTime().seconds);
        }, 1000);
        return () => clearInterval(time);
    }, []);
    return (_jsx(Widget, { children: day === "--" ? (_jsx(Loader, {})) : (
        // basic: text-[32vw] leading-[.9]
        _jsxs("div", { className: "flex gap-3 h-full", children: [_jsxs("div", { className: "elegant flex-1 flex flex-col justify-center items-center", children: [_jsx("p", { className: "text-[40vw] leading-[.70]", children: hours }), _jsx("p", { className: "text-[40vw] leading-[.70]", children: minutes })] }), _jsxs("div", { className: "flex-1 flex flex-col justify-center items-center gap-3", children: [_jsx(Analog, { hourDeg: hourDeg, minDeg: minDeg, secDeg: secDeg }), _jsxs("div", { children: [_jsxs("h2", { className: "text-center leading-[1] font-light text-[7vw]", children: [day, ","] }), _jsx("h3", { className: "text-center leading-[1] font-light text-[6vw] mt-0.5", children: display })] })] })] })) }));
}
export default DateTime;
