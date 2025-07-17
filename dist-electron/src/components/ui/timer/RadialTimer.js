import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { countdownFormat } from "@/utils/misc";
import { useEffect } from "react";
export default function RadialTimer({ setTimeLeft, timeLeft, duration, isRunning, secondary_color, }) {
    const radius = 80;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    useEffect(() => {
        if (!isRunning)
            return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);
    const progress = timeLeft / duration;
    const strokeDashoffset = Number.isNaN(progress) ? 0 : circumference - progress * circumference;
    return (_jsxs("div", { className: "relative flex flex-col items-center justify-center gap-4", children: [_jsx("div", { className: "absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 ", children: _jsx("p", { className: "whitespace-nowrap text-[1.4em] tracking-tighter", children: countdownFormat(timeLeft) }) }), _jsxs("svg", { height: radius * 2, width: radius * 2, className: "transform -rotate-90", children: [_jsx("circle", { stroke: "#ffffff15" // Tailwind gray-200
                        , fill: "transparent", strokeWidth: stroke, r: normalizedRadius, cx: radius, cy: radius }), _jsx("circle", { stroke: secondary_color, fill: "transparent", strokeWidth: stroke, strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", r: normalizedRadius, cx: radius, cy: radius })] })] }));
}
