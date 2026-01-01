import { useState, useEffect } from "react";
import { getNowPlaying } from "../lib/spotify/spotifyApi";
export function useCurrentlyPlaying(interval = 5000) {
    const [track, setTrack] = useState(null);
    const [progress, setProgress] = useState(0);
    const isPlaying = track?.is_playing ?? false;
    useEffect(() => {
        const fetchNowPlaying = async () => {
            const data = await getNowPlaying();
            if (data) {
                setTrack(data);
                setProgress(data?.progress_ms ?? 0);
            }
        };
        fetchNowPlaying(); // initial fetch
        const interval = setInterval(fetchNowPlaying, 10000); // 15s
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (!isPlaying || !track)
            return;
        const interval = setInterval(() => {
            setProgress((p) => p + 1000);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);
    return { track, progress };
}
