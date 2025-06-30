import { jsx as _jsx } from "react/jsx-runtime";
function Paragraph({ text, className, }) {
    return (_jsx("p", { className: `text-[13.5px] ${className}`, children: text }));
}
export default Paragraph;
