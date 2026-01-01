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
import { HeadphoneOff } from "lucide-react";

function NowPlaying() {
  const { track, progress } = useCurrentlyPlaying();
  const { userData } = useAuth();

  console.log(track);
  return (
    <Widget padding="px-0">
      {track ? (
        <div
          className="w-full h-full flex flex-col bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${track.item.album.images[0].url})` }}
        >
          {/* EXPLICIT LABEL */}
          {track.item.explicit && (
            <div className="flex justify-end pt-3 px-4">
              <div
                className="w-[7vw] h-[7vw] rounded-sm flex justify-center items-center"
                style={{
                  backgroundColor: userData?.secondary_color ?? "#2D2929",
                  color: userData?.primary_color ?? "#F7EAE4",
                }}
              >
                <p className="text-[4.5vw] font-medium">E</p>
              </div>
            </div>
          )}
          {/* BACKGROUND GRADIENT FOR FULL SCREEN  */}
          <div
            className="absolute w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, ${
                userData?.primary_color
                  ? userData?.primary_color + "90"
                  : "#F7EAE490"
              })`,
            }}
          ></div>
          <div
            className="h-[50vh] w-full relative mt-auto flex justify-center items-center"
            style={{
              color: userData?.secondary_color ?? "#2D2929",
            }}
          >
            {/* BACKGROUND BLUR MASK */}
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
            <div className="z-5 mt-[7vh] w-full px-4">
              {/* SONG NAME AND ARTIST */}
              <div className="">
                <p className="text-center leading-[1] text-[4.8vw]">
                  {track.item.name}
                </p>
                <p className="text-center leading-[1] text-[4vw] opacity-80">
                  {track.item.artists[0].name}
                </p>
              </div>

              {/* TRACK DURATIONS AND PROGRESS BAR */}
              <div className="w-full flex justify-between items-center gap-3">
                <p className="text-[4vw] min-w-[10vw]">
                  {formatTime(
                    progress < track.item.duration_ms
                      ? progress
                      : track.item.duration_ms
                  )}
                </p>
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{
                    backgroundColor: userData?.secondary_color
                      ? userData?.secondary_color + "40"
                      : "#2D292940",
                  }}
                >
                  <div
                    className="h-full bg-black rounded-full"
                    style={{
                      width:
                        progress < track.item.duration_ms
                          ? `${(progress / track.item.duration_ms) * 100}%`
                          : "100%",
                      backgroundColor: userData?.secondary_color
                        ? userData?.secondary_color
                        : "#2D2929",
                    }}
                  ></div>
                </div>
                <p className="text-[4vw] text-right min-w-[10vw]">
                  {formatTime(track.item.duration_ms)}
                </p>
              </div>
              {/* BUTTON OPERATIONS */}
              <div className="flex items-center justify-center gap-6 mt-[1vh]">
                {/* BACKWARD BUTTON */}
                <button onClick={prevTrack} className="hoverButton">
                  <BackwardIcon className="size-[9vw]" />
                </button>
                {/* PAUSE AND PLAY BUTTONS */}
                <button
                  onClick={() => playPause(track.is_playing)}
                  className="hoverButton"
                >
                  {track.is_playing ? (
                    <PauseIcon className="size-[12vw]" />
                  ) : (
                    <PlayIcon className="size-[12vw]" />
                  )}
                </button>
                {/* FORWARD BUTTON */}
                <button onClick={nextTrack} className="hoverButton">
                  <ForwardIcon className="size-[9vw]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(/images/music-background.jpg)` }}
        >
          {/* BACKGROUND GRADIENT FOR FULL SCREEN  */}
          <div
            className="absolute w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, ${
                userData?.primary_color
                  ? userData?.primary_color + "90"
                  : "#F7EAE490"
              })`,
            }}
          ></div>
          <div className="h-[50vh] w-full flex justify-center items-center">
            <HeadphoneOff
              className="w-[25vw] h-[25vw] mt-[20vh]"
              strokeWidth={1.5}
            />
          </div>
          <div
            className="h-[50vh] w-full relative mt-auto flex justify-center items-center"
            style={{
              color: userData?.secondary_color ?? "#2D2929",
            }}
          >
            {/* BACKGROUND BLUR MASK */}
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
            <div className="z-5 mt-[7vh] w-full px-4">
              {/* SONG NAME AND ARTIST */}
              <div className="">
                <p className="text-center leading-[1] text-[4.8vw]">
                  {/* {track.item.name} */}
                </p>
                <p className="text-center leading-[1] text-[4vw] opacity-80">
                  {/* {track.item.artists[0].name} */}
                </p>
              </div>
              {/* BUTTON OPERATIONS */}
              <div className="flex items-center justify-center gap-6 mt-[1vh]">
                {/* BACKWARD BUTTON */}
                <button onClick={prevTrack} className="hoverButton">
                  <BackwardIcon className="size-[9vw]" />
                </button>
                {/* PAUSE AND PLAY BUTTONS */}
                <button
                  onClick={() => playPause(false)}
                  className="hoverButton"
                >
                  <PlayIcon className="size-[12vw]" />
                </button>
                {/* FORWARD BUTTON */}
                <button onClick={nextTrack} className="hoverButton">
                  <ForwardIcon className="size-[9vw]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
}

export default NowPlaying;
