import { jsx as _jsx } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import NowPlaying from "./NowPlaying";
import { loginWithSpotify } from "@/lib/spotify/spotifyAuth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
function MusicPlayer() {
    const token = localStorage.getItem("spotify_access_token");
    const { userData } = useAuth();
    if (!token) {
        return (_jsx(Widget, { className: "flex justify-center items-center", children: _jsx(Button, { className: "", onClick: loginWithSpotify, style: {
                    backgroundColor: userData?.secondary_color,
                    color: userData?.primary_color,
                }, children: "Connect Spotify" }) }));
    }
    return (_jsx(Widget, { children: _jsx(NowPlaying, {}) }));
}
export default MusicPlayer;
