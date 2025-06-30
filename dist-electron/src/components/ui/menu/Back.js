import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header6 from "../headings/Header6";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function Back() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "mt-2 flex justify-end w-full", children: _jsxs("button", { onClick: () => navigate(-1), className: "cursor-pointer flex items-center gap-2 group w-fit", children: [_jsx(ArrowLeft, { strokeWidth: 1, className: "w-5 h-5 group-hover:-translate-x-1 duration-300" }), _jsx(Header6, { text: "Back" })] }) }));
}
export default Back;
