import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
function DateTime() {
    return (_jsx(Widget, { children: _jsxs("div", { className: "p-3", children: [_jsxs("div", { className: "p-2 flex gap-2 items-start justify-center rounded-md bg-white/20", children: [_jsxs("h1", { className: "elegant text-[30vw] leading-[1]", children: ["9", _jsx("span", { className: "animate-pulse", children: ":" }), "30"] }), _jsx("p", { className: "elegant text-[7vw]", children: "AM" })] }), _jsx("div", { className: "", children: [9,] })] }) }));
}
export default DateTime;
