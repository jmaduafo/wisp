import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Widget({ children }) {
    return (_jsxs("div", { className: "relative h-full overflow-hidden", children: [_jsx("div", { className: "drag bg-black/90 w-full h-[22.5px]" }), _jsx("div", { className: "backdrop-blur-2xl", children: children })] }));
}
export default Widget;
