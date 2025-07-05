import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, useLocation } from "react-router-dom";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import Misc from "./components/pages/misc/Misc";
function App() {
    const { pathname } = useLocation();
    return (_jsx("div", { className: `${pathname === "/" ? "bg-bgColor text-textColor" : "bg-red-300 text-white"} h-screen classic`, children: _jsx("main", { className: `h-full`, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainMenu, {}) }), _jsx(Route, { path: "/weather", element: _jsx(Weather, {}) }), _jsx(Route, { path: "/date-time", element: _jsx(DateTime, {}) }), _jsx(Route, { path: "/music-player", element: _jsx(Weather, {}) }), _jsx(Route, { path: "/to-do", element: _jsx(Weather, {}) }), _jsx(Route, { path: "/album", element: _jsx(Weather, {}) }), _jsx(Route, { path: "/misc", element: _jsx(Misc, {}) })] }) }) }));
}
export default App;
