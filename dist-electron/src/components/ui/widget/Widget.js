import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Widget({ children, className }) {
    return (_jsxs("div", { className: "relative h-full overflow-y-hidden", children: [_jsx("div", { className: "absolute drag bg-red-300 w-full h-[22.5px] -z-1" }), _jsx("div", { className: `pt-2 px-3 pb-[12vh] ${className} h-full`, children: children })] }));
}
export default Widget;
