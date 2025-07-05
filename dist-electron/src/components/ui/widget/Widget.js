import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Widget({ children }) {
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute drag bg-red-300 w-full h-[22.5px] -z-1" }), _jsx("div", { className: "py-2 px-3", children: children })] }));
}
export default Widget;
