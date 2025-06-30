import { jsx as _jsx } from "react/jsx-runtime";
import Display from '../../ui/menu/Display';
import { CalendarDays, Calendar1, Clock8 } from 'lucide-react';
function DateTime() {
    // time, date
    const data = [
        {
            navLink: "date-time/date",
            icon: _jsx(Calendar1, { strokeWidth: 1, className: 'w-7 h-7' }),
            title: "date"
        },
        {
            navLink: "date-time/time",
            icon: _jsx(Clock8, { strokeWidth: 1, className: 'w-7 h-7' }),
            title: "time"
        },
        {
            navLink: "date-time/calendar",
            icon: _jsx(CalendarDays, { strokeWidth: 1, className: 'w-7 h-7' }),
            title: "calendar"
        },
    ];
    return (_jsx(Display, { text: 'Date & time', array: data }));
}
export default DateTime;
