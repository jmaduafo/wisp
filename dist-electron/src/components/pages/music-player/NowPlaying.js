import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { useCurrentlyPlaying } from "@/hooks/useCurrentlyPlaying";
import { nextTrack, playPause, prevTrack } from "@/lib/spotify/spotifyApi";
import { formatTime } from "@/utils/musicPlayer";
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, } from "@heroicons/react/24/solid";
import { HeadphoneOff } from "lucide-react";
function NowPlaying() {
    const { track, progress } = useCurrentlyPlaying();
    const { userData } = useAuth();
    console.log(track);
    return (_jsx(Widget, { padding: "px-0", children: track ? (_jsxs("div", { className: "w-full h-full flex flex-col bg-cover bg-top bg-no-repeat", style: { backgroundImage: `url(${track.item.album.images[0].url})` }, children: [track.item.explicit && (_jsx("div", { className: "flex justify-end pt-3 px-4", children: _jsx("div", { className: "w-[7vw] h-[7vw] rounded-sm flex justify-center items-center", style: {
                            backgroundColor: userData?.secondary_color ?? "#2D2929",
                            color: userData?.primary_color ?? "#F7EAE4",
                        }, children: _jsx("p", { className: "text-[4.5vw] font-medium", children: "E" }) }) })), _jsx("div", { className: "absolute w-full h-full", style: {
                        backgroundImage: `linear-gradient(to bottom, transparent, ${userData?.primary_color
                            ? userData?.primary_color + "90"
                            : "#F7EAE490"})`,
                    } }), _jsxs("div", { className: "h-[50vh] w-full relative mt-auto flex justify-center items-center", style: {
                        color: userData?.secondary_color ?? "#2D2929",
                    }, children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-full backdrop-blur-md -z-0", style: {
                                mask: `linear-gradient(to top, ${userData?.primary_color
                                    ? userData?.primary_color + " 50%"
                                    : "#F7EAE4 50%"}, transparent 100%)`,
                            } }), _jsxs("div", { className: "z-5 mt-[7vh] w-full px-4", children: [_jsxs("div", { className: "", children: [_jsx("p", { className: "text-center leading-[1] text-[4.8vw]", children: track.item.name }), _jsx("p", { className: "text-center leading-[1] text-[4vw] opacity-80", children: track.item.artists[0].name })] }), _jsxs("div", { className: "w-full flex justify-between items-center gap-3", children: [_jsx("p", { className: "text-[4vw] min-w-[10vw]", children: formatTime(progress < track.item.duration_ms
                                                ? progress
                                                : track.item.duration_ms) }), _jsx("div", { className: "flex-1 h-1.5 rounded-full", style: {
                                                backgroundColor: userData?.secondary_color
                                                    ? userData?.secondary_color + "40"
                                                    : "#2D292940",
                                            }, children: _jsx("div", { className: "h-full bg-black rounded-full", style: {
                                                    width: progress < track.item.duration_ms
                                                        ? `${(progress / track.item.duration_ms) * 100}%`
                                                        : "100%",
                                                    backgroundColor: userData?.secondary_color
                                                        ? userData?.secondary_color
                                                        : "#2D2929",
                                                } }) }), _jsx("p", { className: "text-[4vw] text-right min-w-[10vw]", children: formatTime(track.item.duration_ms) })] }), _jsxs("div", { className: "flex items-center justify-center gap-6 mt-[1vh]", children: [_jsx("button", { onClick: prevTrack, className: "hoverButton", children: _jsx(BackwardIcon, { className: "size-[9vw]" }) }), _jsx("button", { onClick: () => playPause(track.is_playing), className: "hoverButton", children: track.is_playing ? (_jsx(PauseIcon, { className: "size-[12vw]" })) : (_jsx(PlayIcon, { className: "size-[12vw]" })) }), _jsx("button", { onClick: nextTrack, className: "hoverButton", children: _jsx(ForwardIcon, { className: "size-[9vw]" }) })] })] })] })] })) : (_jsxs("div", { className: "w-full h-full flex flex-col bg-cover bg-top bg-no-repeat", style: { backgroundImage: `url(/images/music-background.jpg)` }, children: [_jsx("div", { className: "absolute w-full h-full", style: {
                        backgroundImage: `linear-gradient(to bottom, transparent, ${userData?.primary_color
                            ? userData?.primary_color + "90"
                            : "#F7EAE490"})`,
                    } }), _jsx("div", { className: "h-[50vh] w-full flex justify-center items-center", children: _jsx(HeadphoneOff, { className: "w-[25vw] h-[25vw] mt-[20vh]", strokeWidth: 1.5 }) }), _jsxs("div", { className: "h-[50vh] w-full relative mt-auto flex justify-center items-center", style: {
                        color: userData?.secondary_color ?? "#2D2929",
                    }, children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-full backdrop-blur-md -z-0", style: {
                                mask: `linear-gradient(to top, ${userData?.primary_color
                                    ? userData?.primary_color + " 50%"
                                    : "#F7EAE4 50%"}, transparent 100%)`,
                            } }), _jsxs("div", { className: "z-5 mt-[7vh] w-full px-4", children: [_jsxs("div", { className: "", children: [_jsx("p", { className: "text-center leading-[1] text-[4.8vw]" }), _jsx("p", { className: "text-center leading-[1] text-[4vw] opacity-80" })] }), _jsxs("div", { className: "flex items-center justify-center gap-6 mt-[1vh]", children: [_jsx("button", { onClick: prevTrack, className: "hoverButton", children: _jsx(BackwardIcon, { className: "size-[9vw]" }) }), _jsx("button", { onClick: () => playPause(false), className: "hoverButton", children: _jsx(PlayIcon, { className: "size-[12vw]" }) }), _jsx("button", { onClick: nextTrack, className: "hoverButton", children: _jsx(ForwardIcon, { className: "size-[9vw]" }) })] })] })] })] })) }));
}
export default NowPlaying;
