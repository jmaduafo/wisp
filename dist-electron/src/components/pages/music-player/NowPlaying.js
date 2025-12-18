import { jsx as _jsx } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { useCurrentlyPlaying } from "@/hooks/useCurrentlyPlaying";
function NowPlaying() {
    const track = useCurrentlyPlaying();
    if (!track) {
        return (_jsx(Widget, { children: _jsx("div", { children: _jsx("p", { children: "No music playing" }) }) }));
    }
    //   console.log(track)
    //   const { item, is_playing } = track;
    return (_jsx(Widget, { children: _jsx("div", {}) }));
}
export default NowPlaying;
