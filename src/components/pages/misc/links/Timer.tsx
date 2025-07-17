import RadialTimer from "@/components/ui/timer/RadialTimer";
import Widget from "@/components/ui/widget/Widget";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loading/Loader";
import { Volume2, VolumeOff, Pause, Play, CircleCheck } from "lucide-react";
import Counter from "@/components/ui/timer/Counter";
import { secondsFormat } from "@/utils/misc";

export default function Timer() {
  const { userData } = useAuth();

  const [isVolumeOn, setIsVolumeOn] = useState(true);

  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCounter, setIsCounter] = useState(true);

  const [hourCount, setHourCount] = useState(0);
  const [minuteCount, setMinuteCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  const allZero = hourCount === 0 && minuteCount === 0 && secondCount === 0;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  function getCountdown() {
    if (allZero) {
      return;
    }

    setDuration(secondsFormat(hourCount, minuteCount, secondCount));
    setTimeLeft(secondsFormat(hourCount, minuteCount, secondCount));
    setIsCounter(false);
    setIsRunning(true);
  }

  function pausePlay() {
    setIsRunning((prev) => !prev);

    if (isRunning && timeLeft === 0) {
      setHourCount(0);
      setMinuteCount(0);
      setSecondCount(0);
      setIsRunning(false);
      setIsCounter(true);
    }
  }

  function stop() {
    setHourCount(0);
    setMinuteCount(0);
    setSecondCount(0);
    setIsRunning(false);
    setIsCounter(true);
  }

  // This effect watches timeLeft and plays the sound
  useEffect(() => {
    if (timeLeft === 0 && isRunning && isVolumeOn) {
      try {
        // PLAY AUDIO ONCE THE TIMER RUNS OUT AND IF THE VOLUME IS ON
        audioRef.current?.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    } else {
      // DON'T PLAY IF CONDITIONS ARE NOT MET
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0; // Reset audio when not needed
    }
  }, [timeLeft, isRunning, isVolumeOn]);

  return (
    <Widget padding="p-2">
      {!userData ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-end">
            <button
              className="cursor-pointer"
              onClick={() => setIsVolumeOn((prev) => !prev)}
            >
              {isVolumeOn ? (
                <Volume2 className="w-[7vw] h-[7vw]" strokeWidth={1.2} />
              ) : (
                <VolumeOff className="w-[7vw] h-[7vw]" strokeWidth={1.2} />
              )}
            </button>
          </div>
          <audio ref={audioRef} loop>
            <source src="/audio/digital_clock.wav" type="audio/wav" />
          </audio>
          <div className="flex justify-center items-center mt-[4vh]">
            <RadialTimer
              isRunning={isRunning}
              setTimeLeft={setTimeLeft}
              timeLeft={timeLeft}
              duration={duration}
              secondary_color={userData?.secondary_color}
            />
          </div>
          <div className="mt-[6vh]">
            {isCounter ? (
              <div className="flex justify-center items-end gap-2">
                <div className="flex items-center gap-1.5">
                  <Counter
                    setCount={setHourCount}
                    count={hourCount}
                    secondary_color={userData.secondary_color}
                    max_count={12}
                    title="Hour"
                  />
                  <Counter
                    setCount={setMinuteCount}
                    count={minuteCount}
                    secondary_color={userData.secondary_color}
                    max_count={59}
                    title="Mins"
                  />
                  <Counter
                    setCount={setSecondCount}
                    count={secondCount}
                    secondary_color={userData.secondary_color}
                    max_count={59}
                    title="Secs"
                  />
                </div>
                <button
                  className="cursor-pointer pb-1"
                  disabled={allZero}
                  onClick={getCountdown}
                >
                  <CircleCheck className="w-[7vw] h-[7vw]" strokeWidth={1} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={pausePlay}
                  className="cursor-pointer border rounded-md w-[10vw] h-[10vw] flex justify-center items-center hover:bg-white/10 duration-300"
                  style={{
                    borderColor: userData.secondary_color + "50",
                    color: userData.secondary_color,
                  }}
                >
                  {isRunning ? (
                    <Pause
                      className="w-[5.8vw] h-[5.8vw] opacity-100"
                      strokeWidth={1}
                    />
                  ) : (
                    <Play className="w-[5.8vw] h-[5.8vw]" strokeWidth={1} />
                  )}
                </button>
                <button
                  onClick={stop}
                  className="cursor-pointer border rounded-md w-[10vw] h-[10vw] flex justify-center items-center hover:bg-white/10 duration-300"
                  style={{ borderColor: userData.secondary_color + "50" }}
                >
                  <span
                    className="w-[4.55vw] h-[4.5vw] rounded-[3px] opacity-80"
                    style={{ backgroundColor: userData.secondary_color }}
                  ></span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Widget>
  );
}
