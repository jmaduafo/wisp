import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { analogTime, fullDate, fullTime } from "@/utils/dateTime";
import React, { useEffect, useState } from "react";
import Analog from "./Analog";

function DateTime() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hourDeg, setHourDeg] = useState<number | undefined>();
  const [minDeg, setMinDeg] = useState<number | undefined>();
  const [day, setDay] = useState("--");
  const [display, setDisplay] = useState("-----");
  

  useEffect(() => {
    const time = setInterval(() => {
      setHours(fullTime().hours);
      setMinutes(fullTime().minutes);
      setDay(fullDate().day);
      setDisplay(fullDate().display);
      setHourDeg(analogTime().hours)
      setMinDeg(analogTime().minutes)
    }, 1000);

    return () => clearInterval(time);
  }, []);

  return (
    <Widget>
      {day === "--" ? (
        <Loader />
      ) : (
        <div className="flex gap-3 h-full">
          <div className="elegant flex-1 flex flex-col justify-center items-center">
            <p className="text-[40vw] leading-[.75]">{hours}</p>
            <p className="text-[40vw] leading-[.75]">{minutes}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-3">
            <Analog hourDeg={hourDeg} minDeg={minDeg}/>
            <div>
              <h2 className="text-center leading-[1] font-light text-[7vw]">
                {day},
              </h2>
              <h3 className="text-center leading-[1] font-light text-[6vw] mt-0.5">
                {display}
              </h3>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
}

export default DateTime;
