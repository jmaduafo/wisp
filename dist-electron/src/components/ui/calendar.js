import { jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { useAuth } from "@/context/AuthContext";
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
    const { userData } = useAuth();
    return (_jsx(DayPicker, { showOutsideDays: showOutsideDays, className: cn("p-3", className), classNames: {
            months: "flex flex-col sm:flex-row gap-2",
            month: "flex flex-col gap-4",
            caption: "flex justify-center pt-1 relative items-center w-full",
            caption_label: `${userData?.style === "default" ? "classic text-[1rem]" : "elegant text-[1.15rem] font-light"} font-medium`,
            nav: "flex items-center gap-1",
            // cn(buttonVariants({ variant: "outline" }),
            nav_button: "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-0",
            nav_button_next: "absolute right-0",
            table: "w-full border-collapse space-x-1",
            head_row: "flex justify-between",
            head_cell: "opacity-70 rounded-md w-full font-normal text-[0.8rem]",
            row: "flex justify-between w-full mt-2",
            cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"),
            // cn(buttonVariants({ variant: "ghost" }),
            day: "size-7.5 p-0 font-normal aria-selected:opacity-100 hover:bg-white/15 rounded-md",
            day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
            day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "day-outside opacity-40 aria-selected:text-muted-foreground",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            ...classNames,
        }, components: {
            IconLeft: ({ className, ...props }) => (_jsx(ChevronLeft, { className: cn("size-4", className), ...props })),
            IconRight: ({ className, ...props }) => (_jsx(ChevronRight, { className: cn("size-4", className), ...props })),
        }, ...props }));
}
export { Calendar };
