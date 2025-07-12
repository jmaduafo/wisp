import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "../../button";
import { Switch } from "../../switch";
import { color_themes } from "@/utils/data";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Loading from "../../loading/ButtonLoading";
function Settings() {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isStyled, setIsStyled] = useState(false);
    const [settings, setSettings] = useState({
        name: "",
        primary_color: "",
        secondary_color: "",
    });
    useEffect(() => {
        if (userData) {
            setSettings({
                name: userData?.name ?? "",
                primary_color: userData?.primary_color,
                secondary_color: userData?.secondary_color,
            });
            userData.style === "default" ? setIsStyled(false) : setIsStyled(true);
        }
    }, [userData?.id ?? "guest"]);
    const updateSettings = async (e) => {
        e.preventDefault();
        if (!settings.name.length) {
            toast("Something went wrong", {
                description: "Please enter your name",
            });
        }
        try {
            setLoading(true);
            if (!userData) {
                return;
            }
            const userRef = doc(db, "users", userData?.id);
            await updateDoc(userRef, {
                name: settings.name,
                primary_color: settings.primary_color,
                secondary_color: settings.secondary_color,
                style: isStyled ? "wisp" : "default",
                updated_at: serverTimestamp(),
            });
            toast("Success!", {
                description: "Settings was updated successfully",
            });
        }
        catch (err) {
            toast("Something went wrong", {
                description: err.message,
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(Dialog, { children: _jsxs("form", { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx("button", { className: "cursor-pointer", children: _jsx(Cog8ToothIcon, { className: "w-6" }) }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", "aria-describedby": undefined, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Settings" }) }), _jsxs("form", { className: "", onSubmit: updateSettings, children: [_jsx("div", { className: "p-2", children: _jsx("input", { type: "text", name: "name", placeholder: "Enter name", className: "border-none outline-none placeholder-textColor/50 text-[3.7vw] w-full", value: settings.name, onChange: (e) => setSettings({ ...settings, name: e.target.value }) }) }), _jsxs("div", { className: "p-2 border-t border-t-textColor/20", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("label", { htmlFor: "primary", children: "Primary color" }), _jsx("input", { type: "color", name: "primary", id: "primary", className: "cursor-pointer rounded-md", value: settings.primary_color, onChange: (e) => setSettings({
                                                                ...settings,
                                                                primary_color: e.target.value,
                                                            }) })] }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [_jsx("label", { htmlFor: "secondary", children: "Secondary color" }), _jsx("input", { type: "color", name: "secondary", id: "secondary", className: "cursor-pointer rounded-md", value: settings.secondary_color, onChange: (e) => setSettings({
                                                                ...settings,
                                                                secondary_color: e.target.value,
                                                            }) })] })] }), _jsx("div", { className: "flex justify-between gap-2 mt-2", children: color_themes.map((item) => {
                                                return (_jsxs("button", { type: "button", className: "h-7 w-10 flex cursor-pointer", onClick: (e) => setSettings({
                                                        ...settings,
                                                        primary_color: item.primary,
                                                        secondary_color: item.secondary,
                                                    }), children: [_jsx("span", { className: "flex-1 h-full", style: { backgroundColor: item.primary } }), _jsx("span", { className: "flex-1 h-full", style: { backgroundColor: item.secondary } })] }, item.title));
                                            }) })] }), _jsxs("div", { className: "p-2 border-t border-t-textColor/20 flex justify-between items-center", children: [_jsxs("label", { htmlFor: "style", children: ["Font style (", isStyled ? "wisp" : "default", ")"] }), _jsx(Switch, { id: "style", checked: isStyled, onCheckedChange: setIsStyled })] }), _jsxs(DialogFooter, { className: "mt-2", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { type: "submit", children: loading ? _jsx(Loading, {}) : "Save changes" })] })] })] })] }) }));
}
export default Settings;
