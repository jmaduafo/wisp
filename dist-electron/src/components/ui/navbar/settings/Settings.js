import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "../../button";
function Settings() {
    return (_jsx(Dialog, { children: _jsxs("form", { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx("button", { className: "cursor-pointer", children: _jsx(Cog8ToothIcon, { className: "w-6" }) }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Settings" }), _jsx(DialogDescription, { children: "Make changes to your profile here. Click save when you're done." })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { type: "submit", children: "Save changes" })] })] })] }) }));
}
export default Settings;
