import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import Header4 from "../headings/Header4";
function NavBar() {
    return (_jsxs("header", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full flex justify-center items-center bg-textColor text-bgColor", children: _jsx("h3", { className: "logo text-lg", children: "w" }) }), _jsx(Header4, { text: "Hello" })] }), _jsx("button", { children: _jsx(Cog8ToothIcon, { className: "w-6" }) })] }));
}
export default NavBar;
