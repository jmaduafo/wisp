import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Settings from "./settings/Settings";
import { useAuth } from "@/context/AuthContext";
import Header5 from "../headings/Header5";
function NavBar() {
    const { userData } = useAuth();
    return (_jsxs("header", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full flex justify-center items-center bg-textColor text-bgColor", children: _jsx("h3", { className: "logo text-lg", children: "w" }) }), userData?.name ? _jsx(Header5, { text: `Hello, ${userData.name}` }) : null] }), _jsx(Settings, {})] }));
}
export default NavBar;
