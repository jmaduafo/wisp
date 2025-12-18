import { useState, useEffect } from "react";
import { getNowPlaying } from "../lib/spotify/spotifyApi";

export function useCurrentlyPlaying(interval = 5000) {
  const [track, setTrack] = useState<any>(null);
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

    const interval = setInterval(fetchNowPlaying, 10_000); // 15s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPlaying || !track) return;

    const interval = setInterval(() => {
      if (track.progress_ms < track.item.duration_ms) {
        setProgress((p) => p + 1000);
      } else {
        setProgress(track.progress_ms);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return { track, progress };
}
