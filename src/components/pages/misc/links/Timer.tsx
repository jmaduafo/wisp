import RadialTimer from "@/components/ui/timer/RadialTimer";
import Widget from "@/components/ui/widget/Widget";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loading/Loader";
import { Volume2, VolumeOff } from "lucide-react";

export default function Timer() {
  const { userData } = useAuth();
  const duration = 700

  const [isVolumeOn, setIsVolumeOn] = useState(true);
   const [timeLeft, setTimeLeft] = useState(duration);

  return (
    <Widget padding="p-2">
      {!userData ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-end">
            <button className="cursor-pointer">
              {isVolumeOn ? (
                <Volume2 className="w-[7vw] h-[7vw]" strokeWidth={1.2} />
              ) : (
                <VolumeOff className="w-[7vw] h-[7vw]" strokeWidth={1.2} />
              )}
            </button>
          </div>
          <div className="flex justify-center items-center">
            <RadialTimer
              setTimeLeft={setTimeLeft}
              timeLeft={timeLeft}
              duration={duration}
              secondary_color={userData?.secondary_color}
            />
          </div>
        </div>
      )}
    </Widget>
  );
}
