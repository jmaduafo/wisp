import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Minus, X } from "lucide-react";
function Controls() {
    return (_jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-1 drag" }), _jsxs("div", { className: "flex items-center gap-2 p-1", children: [_jsx("button", { onClick: () => window.api.minimize(), className: "cursor-pointer", children: _jsx(Minus, { strokeWidth: 1 }) }), _jsx("button", { onClick: () => window.api.close(), className: "cursor-pointer", children: _jsx(X, { strokeWidth: 1 }) })] })] }));
}
export default Controls;
