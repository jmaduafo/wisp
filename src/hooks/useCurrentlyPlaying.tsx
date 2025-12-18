import { useState, useEffect } from "react";
import { getNowPlaying } from "../lib/spotify/spotifyApi";

export function useCurrentlyPlaying(interval = 5000) {
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchTrack = async () => {
      try {
        const data = await getNowPlaying();
        console.log(data)
        setTrack(data);
      } catch (err) {
        console.error(err);
        return
      }
    };

    fetchTrack();
    // timer = setInterval(fetchTrack, interval);

    // return () => clearInterval(timer);
  }, [interval]);

  return track;
}
