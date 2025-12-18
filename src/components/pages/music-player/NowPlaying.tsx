import Widget from "@/components/ui/widget/Widget";
import { useAuth } from "@/context/AuthContext";
import { useCurrentlyPlaying } from "@/hooks/useCurrentlyPlaying";
import { nextTrack, playPause, prevTrack } from "@/lib/spotify/spotifyApi";
import { formatTime } from "@/utils/musicPlayer";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function NowPlaying() {
  const track = useCurrentlyPlaying();
  const { userData } = useAuth();

  //   const [ progressBar, setProgressBar ] = useState)
//     useEffect(() => {
//     if (!is_playing) return;

//     const interval = setInterval(() => {
//       progress += 1000
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [is_playing]);

  if (!track) {
    return (
      <Widget>
        <div>
          <p>No music playing</p>
        </div>
      </Widget>
    );
  }

  const { item, is_playing } = track;

  let progress = track.progress_ms;
  const total = item.duration_ms;


  return (
    <Widget padding="px-0">
      <div
        className="w-full h-full flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.album.images[0].url})` }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            backgroundColor: userData?.primary_color
              ? userData?.primary_color + "20"
              : "#F7EAE420",
          }}
        ></div>
        <div
          className="h-[50vh] w-full relative mt-auto flex justify-center items-center"
          style={{
            color: userData?.secondary_color ?? "#2D2929",
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full backdrop-blur-md -z-0"
            style={{
              mask: `linear-gradient(to top, ${
                userData?.primary_color
                  ? userData?.primary_color + " 50%"
                  : "#F7EAE4 50%"
              }, transparent 100%)`,
            }}
          ></div>
          <div className="z-5 mt-[7vh] w-full px-2">
            <div className="w-full flex justify-between items-center gap-3">
              <p className="text-[4vw]">{formatTime(progress)}</p>
              <div
                className="flex-1 h-1.5 bg-black/40 rounded-full"
                style={{
                  backgroundColor: userData?.primary_color
                    ? userData?.primary_color + "20"
                    : "#2D292920",
                }}
              >
                <div
                  className="h-full bg-black rounded-full"
                  style={{
                    width: `${(progress / total) * 100}%`,
                    backgroundColor: userData?.secondary_color
                      ? userData?.secondary_color
                      : "#2D2929",
                  }}
                ></div>
              </div>
              <p className="text-[4vw]">{formatTime(total)}</p>
            </div>
            <div className="flex items-center justify-center gap-6 mt-[2vh]">
              <button onClick={prevTrack} className="hoverButton">
                <BackwardIcon className="size-[9vw]" />
              </button>
              <button onClick={playPause} className="hoverButton">
                {is_playing ? (
                  <PauseIcon className="size-[12vw]" />
                ) : (
                  <PlayIcon className="size-[12vw]" />
                )}
              </button>
              <button onClick={nextTrack} className="hoverButton">
                <ForwardIcon className="size-[9vw]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
}

export default NowPlaying;
