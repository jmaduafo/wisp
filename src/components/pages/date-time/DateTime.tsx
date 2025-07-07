import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { analogTime, fullDate, fullTime } from "@/utils/dateTime";
import React, { useEffect, useState } from "react";
import Analog from "./Analog";

function DateTime() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const [day, setDay] = useState("--");
  const [display, setDisplay] = useState("-----");

  const [hourDeg, setHourDeg] = useState<number | undefined>();
  const [minDeg, setMinDeg] = useState<number | undefined>();
  const [secDeg, setSecDeg] = useState<number | undefined>();

  useEffect(() => {
    const time = setInterval(() => {
      setHours(fullTime().hours);
      setMinutes(fullTime().minutes);
      setDay(fullDate().day);
      setDisplay(fullDate().display);
      setHourDeg(analogTime().hours);
      setMinDeg(analogTime().minutes);
      setSecDeg(analogTime().seconds);
    }, 1000);

    return () => clearInterval(time);
  }, []);

  return (
    <Widget className="flex items-center justify-center">
        {day === "--" ? (
          <Loader />
        ) : (
          // basic: text-[32vw] leading-[.9]
          <div className="flex gap-3">
            <div className="elegant flex-1 flex flex-col justify-center items-center">
              <p className="text-[40vw] leading-[.70]">{hours}</p>
              <p className="text-[40vw] leading-[.70]">{minutes}</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-3">
              <Analog hourDeg={hourDeg} minDeg={minDeg} secDeg={secDeg} />
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
