import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import Header1 from "../headings/Header1";
import MenuCard from "./MenuCard";
import NavBar from "../navbar/Navbar";
function Display({ text, array }) {
    return (_jsxs("section", { className: "h-full flex flex-col", children: [_jsx(NavBar, {}), _jsx("div", { className: "mt-6 border-b-[2px] border-b-textColor w-fit", children: _jsx(Header1, { text: text, className: "font-medium" }) }), _jsx("div", { className: "mt-auto w-full", children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: array.map((item) => {
                        return (_jsx(Fragment, { children: _jsx(MenuCard, { title: item.title, icon: item.icon, link: item.navLink }) }, item.navLink));
                    }) }) })] }));
}
export default Display;
