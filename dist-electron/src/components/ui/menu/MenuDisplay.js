import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import Controls from "../controls/Controls";
import NavBar from "../navbar/Navbar";
import MenuCard from "./MenuCard";
import Header1 from "../headings/Header1";
import { useLocation } from "react-router-dom";
import Back from "./Back";
function MenuDisplay({ array, title }) {
    const { pathname } = useLocation();
    return (_jsxs("section", { className: "h-full", children: [_jsx(Controls, {}), _jsxs("div", { className: "px-6", children: [_jsx(NavBar, {}), pathname.includes("menu") ? _jsx(Back, {}) : null, _jsx("div", { className: "mt-6 my-4 border-b-[2px] border-b-textColor w-fit", children: _jsx(Header1, { text: title, className: "font-medium" }) }), _jsx("div", { className: "mt-[2em] w-full", children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: array.map((item) => {
                                return (_jsx(Fragment, { children: _jsx(MenuCard, { title: item.title, icon: item.icon, link: item.navLink }) }, item.navLink));
                            }) }) })] })] }));
}
export default MenuDisplay;
