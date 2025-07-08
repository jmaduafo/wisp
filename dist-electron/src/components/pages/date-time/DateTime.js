import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { analogTime, fullDate, fullTime } from "@/utils/dateTime";
import Analog from "./Analog";
function DateTime() {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [day, setDay] = useState("--");
    const [display, setDisplay] = useState("-----");
    const [hourDeg, setHourDeg] = useState();
    const [minDeg, setMinDeg] = useState();
    const [secDeg, setSecDeg] = useState();
    const [is12, setIs12] = useState(false);
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
    const checkHours = () => {
        if (is12) {
            if (+hours % 12 === 0) {
                return "12";
            }
            else if (+hours > 12 && +hours < 22) {
                return "0" + +hours % 12;
            }
            else if (+hours >= 22 && +hours <= 23) {
                return +hours % 12;
            }
            else {
                return hours;
            }
        }
        else {
            return hours;
        }
    };
    return (_jsx(Widget, { className: "", children: day === "--" ? (_jsx(Loader, {})) : (
        // basic: text-[32vw] leading-[.9]
        _jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-end gap-2.5 items-end", children: [_jsx("button", { onClick: () => setIs12(false), disabled: !is12, className: `${!is12
                                ? "text-[5vw] opacity-100"
                                : "text-[4.3vw] opacity-50 cursor-pointer"} leading-[1] cursor-pointer`, children: "24" }), _jsx("button", { onClick: () => setIs12(true), disabled: is12, className: `${!is12
                                ? "text-[4.3vw] opacity-50 cursor-pointer"
                                : "text-[5vw] opacity-100"} leading-[1]`, children: "12" })] }), _jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsxs("div", { className: `flex ${is12 ? "gap-2" : "gap-5"}`, children: [_jsxs("div", { className: "flex items-start elegant", children: [_jsxs("div", { className: `text-[38vw] flex-1 flex flex-col justify-start items-center`, children: [_jsx("p", { className: "leading-[.7]", children: checkHours() }), _jsx("p", { className: "leading-[.7]", children: minutes })] }), _jsx("div", { className: `${is12 ? "block" : "hidden"}`, children: _jsx("p", { className: "text-[6.5vw] leading-[1]", children: +hours < 12 ? "AM" : "PM" }) })] }), _jsxs("div", { className: "flex-1 flex flex-col justify-center items-center gap-3", children: [_jsx(Analog, { hourDeg: hourDeg, minDeg: minDeg, secDeg: secDeg }), _jsxs("div", { children: [_jsxs("h2", { className: "text-center leading-[1] font-light text-[7vw]", children: [day, ","] }), _jsx("h3", { className: "text-center leading-[1] font-light text-[6vw] mt-0.5", children: display })] })] })] }) })] })) }));
}
export default DateTime;
