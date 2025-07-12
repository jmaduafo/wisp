import { jsx as _jsx } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { Camera } from "lucide-react";
function Album() {
    return (_jsx(Widget, { padding: "p-0", className: "group duration-300", children: _jsx("button", { className: "w-full h-full cursor-pointer invisible group-hover:visible bg-black/30 flex justify-center items-center", children: _jsx(Camera, { className: "w-[40vw] h-[40vw]", strokeWidth: 1 }) }) }));
}
export default Album;
