import { jsx as _jsx } from "react/jsx-runtime";
import MenuDisplay from "@/components/ui/menu/MenuDisplay";
import { Calculator, Gamepad2, CalendarDays, Hourglass, MessageCircleQuestion, Quote, } from "lucide-react";
function Misc() {
    const misc = [
        {
            title: "Mini game",
            navLink: "misc/game",
            icon: _jsx(Gamepad2, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Calculator",
            navLink: "misc/calculator",
            icon: _jsx(Calculator, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Calendar",
            navLink: "misc/calendar",
            icon: _jsx(CalendarDays, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Timer",
            navLink: "misc/timer",
            icon: _jsx(Hourglass, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Quote",
            navLink: "misc/quote",
            icon: _jsx(Quote, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Daily quiz",
            navLink: "misc/quiz",
            icon: _jsx(MessageCircleQuestion, { className: "w-7 h-7", strokeWidth: 1 }),
        },
    ];
    return _jsx(MenuDisplay, { array: misc, title: "Misc" });
}
export default Misc;
