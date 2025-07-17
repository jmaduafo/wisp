import { jsx as _jsx } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { Calendar as CalendarDisplay } from "@/components/ui/calendar";
import { useAuth } from "@/context/AuthContext";
export default function Calendar() {
    const { userData } = useAuth();
    const today = new Date();
    return (_jsx(Widget, { padding: "p-2", className: "overflow-y-auto overflow-x-hidden verticalScroll", children: _jsx(CalendarDisplay, { mode: "single", className: "rounded-md", captionLayout: "dropdown", modifiers: {
                customToday: today,
            }, 
            // Step 2: apply inline styles to that modifier
            modifiersStyles: {
                customToday: {
                    backgroundColor: userData?.secondary_color || "#fff",
                    color: userData?.primary_color || "#000",
                    borderRadius: "8px",
                },
            } }) }));
}
