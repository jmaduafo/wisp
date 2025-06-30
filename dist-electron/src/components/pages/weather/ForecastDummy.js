import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import ForecastCard from "./ForecastCard";
function ForecastDummy({ primaryColor, secondaryColor, is_glassomorphic, is_primary, index, data }) {
    return (_jsx("div", { className: "grid grid-cols-3 gap-2 overflow-x-auto scrollBar", children: data?.map((item, i) => {
            return (_jsx(Fragment, { children: _jsx(ForecastCard, { top_text: item.top_text, icon: item.icon, temp: item.temp, index: i, primary_color: primaryColor, secondary_color: secondaryColor, is_glassomorphic: is_glassomorphic, is_primary: is_primary }) }, `${item.top_text}`));
        }) }));
}
export default ForecastDummy;
