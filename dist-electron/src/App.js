import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, useLocation } from "react-router-dom";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import Misc from "./components/pages/misc/Misc";
import MusicPlayer from "./components/pages/music-player/MusicPlayer";
import ToDo from "./components/pages/to-do/ToDo";
import Album from "./components/pages/album/Album";
import { Toaster } from "sonner";
import { useAuth } from "./context/AuthContext";
import MiniGame from "./components/pages/misc/links/MiniGame";
import Calendar from "./components/pages/misc/links/Calendar";
import Timer from "./components/pages/misc/links/Timer";
import Quote from "./components/pages/misc/links/Quote";
import Quiz from "./components/pages/misc/links/Quiz";
import Calculator from "./components/pages/misc/links/Calculator";
function App() {
    const { pathname } = useLocation();
    const { userData } = useAuth();
    return (_jsx("div", { className: `h-screen classic`, style: {
            backgroundColor: userData && (pathname !== "/" && !pathname.includes("menu")) ? userData.primary_color : "#F7EAE4",
            color: userData && (pathname !== "/" && !pathname.includes("menu")) ? userData.secondary_color : "#2D2929",
        }, children: _jsxs("main", { className: `h-full`, children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainMenu, {}) }), _jsx(Route, { path: "/weather", element: _jsx(Weather, {}) }), _jsx(Route, { path: "/date-time", element: _jsx(DateTime, {}) }), _jsx(Route, { path: "/music-player", element: _jsx(MusicPlayer, {}) }), _jsx(Route, { path: "/to-do", element: _jsx(ToDo, {}) }), _jsx(Route, { path: "/album", element: _jsx(Album, {}) }), _jsx(Route, { path: "/misc/menu", element: _jsx(Misc, {}) }), _jsx(Route, { path: "/misc/game", element: _jsx(MiniGame, {}) }), _jsx(Route, { path: "/misc/calculator", element: _jsx(Calculator, {}) }), _jsx(Route, { path: "/misc/calendar", element: _jsx(Calendar, {}) }), _jsx(Route, { path: "/misc/timer", element: _jsx(Timer, {}) }), _jsx(Route, { path: "/misc/quote", element: _jsx(Quote, {}) }), _jsx(Route, { path: "/misc/quiz", element: _jsx(Quiz, {}) })] }), _jsx(Toaster, {})] }) }));
}
export default App;
