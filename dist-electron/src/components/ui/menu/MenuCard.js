import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header4 from "../headings/Header4";
function MenuCard({ title, icon, link, }) {
    return (_jsxs("button", { onClick: () => window.api.openWidget(`${link}`, `${link}`), className: "cursor-pointer hover:opacity-70 duration-300 w-full h-[150px] flex flex-col px-4 py-3 rounded-lg bg-bgColor shadow-lg", children: [_jsx("div", { children: _jsx(Header4, { text: title, className: "capitalize text-left" }) }), _jsx("div", { className: "mt-auto flex justify-end", children: icon })] }));
}
export default MenuCard;
