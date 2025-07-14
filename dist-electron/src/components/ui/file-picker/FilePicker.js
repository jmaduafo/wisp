import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
function FilePicker({ children, inputRef, setNewImages, className, }) {
    return (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: className, onClick: () => inputRef.current?.click(), children: children }), _jsx("input", { ref: inputRef, type: "file", className: "hidden", accept: "image/*", multiple: true, onChange: (e) => {
                    if (e.target.files !== null) {
                        setNewImages([...e.target.files]);
                    }
                } })] }));
}
export default FilePicker;
