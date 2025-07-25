import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Minus, Plus } from "lucide-react";
function Counter({ count, setCount, secondary_color, max_count, title }) {
    function customMaxCount() {
        if (max_count) {
            if (count === max_count) {
                return "invisible";
            }
            else {
                return "visible";
            }
        }
    }
    return (_jsxs("div", { children: [_jsx("div", { className: "mb-0.5", children: _jsx("p", { className: "text-[0.8em] text-center opacity-70", children: title }) }), _jsxs("div", { className: "flex items-center gap-2 font-light rounded-md border px-1 py-0.5", style: { borderColor: secondary_color + "30" }, children: [_jsx("button", { className: `${count === 0 ? "invisible" : "visible"} cursor-pointer opacity-70`, onClick: () => setCount((prev) => prev - 1), children: _jsx(Minus, { className: "w-[0.75em] h-[0.75em]" }) }), _jsx("p", { className: "text-[0.75em]", children: count < 10 ? "0" + count : count }), _jsx("button", { onClick: () => setCount((prev) => prev + 1), className: `${customMaxCount()} cursor-pointer opacity-70`, children: _jsx(Plus, { className: "w-[0.75em] h-[0.75em]" }) })] })] }));
}
export default Counter;
