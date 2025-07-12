import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
function Analog({ hourDeg, minDeg, secDeg }) {
    const { userData } = useAuth();
    return (_jsxs("div", { className: "relative w-[40vw] h-[40vw] rounded-full", style: {
            color: userData ? userData.primary_color : "#F7EAE4",
            backgroundColor: userData ? userData.secondary_color : "#2D2929",
        }, children: [_jsxs("div", { className: "p-[0.8vw] w-full h-full rounded-full flex flex-col justify-between", children: [_jsx("div", { className: "flex justify-center", children: _jsx("p", { className: "text-[4.2vw]", children: "12" }) }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-[1vw]", children: [_jsx("div", { className: "h-[0.4vw] w-[4vh] rounded-full", style: {
                                            backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                                        } }), _jsx("p", { className: "text-[4.2vw]", children: "9" })] }), _jsx("div", { className: "w-[1.3vw] h-[1.3vw] rounded-full", style: {
                                    backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                                } }), _jsxs("div", { className: "flex items-center gap-[1vw]", children: [_jsx("p", { className: "text-[4.2vw]", children: "3" }), _jsx("div", { className: "h-[0.4vw] w-[4vh] rounded-full", style: {
                                            backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                                        } })] })] }), _jsx("div", { className: "flex justify-center", children: _jsx("p", { className: "text-[4.2vw]", children: "6" }) })] }), _jsx("div", { className: `w-[0.4vw] h-[11vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`, style: {
                    rotate: hourDeg ? `${hourDeg + 180}deg` : `180deg`,
                    backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                } }), _jsx("div", { className: `w-[0.4vw] h-[17.5vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`, style: {
                    rotate: minDeg ? `${minDeg + 180}deg` : `180deg`,
                    backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                } }), _jsx("div", { className: `w-[0.25vw] h-[17.5vh] absolute top-1/2 left-1/2 transform origin-top rounded-full`, style: {
                    rotate: secDeg ? `${secDeg + 180}deg` : `180deg`,
                    backgroundColor: userData ? userData.primary_color : "#F7EAE4",
                } })] }));
}
export default Analog;
