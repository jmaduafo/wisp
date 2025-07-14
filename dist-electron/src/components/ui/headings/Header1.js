import { jsx as _jsx } from "react/jsx-runtime";
function Header1({ text, className, }) {
    return _jsx("h1", { className: `text-2xl ${className}`, children: text });
}
export default Header1;
