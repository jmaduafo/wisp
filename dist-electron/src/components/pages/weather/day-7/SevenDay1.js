import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from "react";
function SevenDay1({ is_glassomorphic, is_primary, primaryColor, secondaryColor, index, }) {
    return (_jsx("div", { className: "flex items-center gap-2 overflow-x-auto scrollBar", children: [0, 1, 2, 3, 4, 5, 6].map((_, i) => {
            return _jsx(Fragment, {}, `${i + 1}`);
        }) }));
}
export default SevenDay1;
