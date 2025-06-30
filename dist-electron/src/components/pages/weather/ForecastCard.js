import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { checkBackground, checkGlassomorphism, } from "../../../utils/helper";
import Header6 from "../../ui/headings/Header6";
import { weatherIcons } from "../../../utils/data";
function ForecastCard({ top_text, icon, temp, index, is_glassomorphic, is_primary, secondary_color, primary_color, }) {
    return (_jsxs("div", { className: `rounded-md px-4 py-1.5 backdrop-blur-xl ${checkGlassomorphism(is_glassomorphic, index)}`, style: {
            // color: checkText({
            //   primaryColor: primary_color,
            //   secondaryColor: secondary_color,
            //   is_primary,
            // }),
            backgroundColor: checkBackground({
                primaryColor: primary_color,
                secondaryColor: secondary_color,
                is_glassomorphic,
                is_primary,
                index,
            }),
        }, children: [_jsx(Header6, { text: top_text, className: "text-center font-light" }), _jsx("div", { className: "my-1 flex justify-center", children: weatherIcons(icon, 1) }), _jsxs("p", { className: "text-center whitespace-nowrap font-light", children: [temp, " \u00B0"] })] }));
}
export default ForecastCard;
