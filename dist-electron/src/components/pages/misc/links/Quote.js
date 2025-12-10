import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
function Quote() {
    const [data, setData] = useState();
    const api_url = "https://random-quotes-freeapi.vercel.app/api/random";
    const { userData } = useAuth();
    async function getAPI() {
        try {
            const response = await fetch(api_url);
            if (response.ok) {
                const d = await response.json();
                setData(d);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getAPI();
    }, []);
    return (_jsx(Widget, { padding: "py-3 px-4", children: data ? (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "40", height: "40", fill: userData?.secondary_color + "60", className: "bi bi-quote", viewBox: "0 0 16 16", children: _jsx("path", { d: "M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" }) }), _jsx("p", { className: "text-[5.5vw] leading-[1] font-light", children: data.quote })] }), _jsxs("p", { className: "mt-auto text-right italic text-[5.5vw]", children: ["- ", data.author] })] })) : (_jsx(Loader, {})) }));
}
export default Quote;
