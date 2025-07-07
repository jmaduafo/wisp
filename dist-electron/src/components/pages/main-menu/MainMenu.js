import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { CloudDrizzle, GalleryVerticalEnd, Clock4, Music, List, BookUser, } from "lucide-react";
import NavBar from "../../ui/navbar/Navbar";
import MenuCard from "../../ui/menu/MenuCard";
import Controls from "../../ui/controls/Controls";
function MainMenu() {
    const nav = [
        {
            title: "Weather",
            navLink: "weather",
            icon: _jsx(CloudDrizzle, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Date & time",
            navLink: "date-time",
            icon: _jsx(Clock4, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Music player",
            navLink: "music-player",
            icon: _jsx(Music, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "To do list",
            navLink: "to-do",
            icon: _jsx(List, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Album",
            navLink: "album",
            icon: _jsx(BookUser, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "misc",
            navLink: "misc",
            icon: _jsx(GalleryVerticalEnd, { className: "w-7 h-7", strokeWidth: 1 }),
        },
    ];
    return (_jsxs("section", { className: "h-full", children: [_jsx(Controls, {}), _jsxs("div", { className: "px-6", children: [_jsx(NavBar, {}), _jsx("div", { className: "mt-[6em] w-full", children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: nav.map((item) => {
                                return (_jsx(Fragment, { children: _jsx(MenuCard, { title: item.title, icon: item.icon, link: item.navLink }) }, item.navLink));
                            }) }) })] })] }));
}
export default MainMenu;
