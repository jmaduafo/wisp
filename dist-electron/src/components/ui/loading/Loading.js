import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
function Loading({ className }) {
    const { userData } = useAuth();
    return (_jsx("div", { className: "w-[4.5vw] h-[4.5vw] rounded-full border border-transparent animate-spin", style: {
            borderTopColor: userData ? userData.secondary_color : "#2D2929",
        } }));
}
export default Loading;
