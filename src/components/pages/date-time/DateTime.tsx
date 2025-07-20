import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/loading/Loader";
import Widget from "@/components/ui/widget/Widget";
import { analogTime, fullDate, fullTime } from "@/utils/dateTime";
import Analog from "./Analog";
import { useAuth } from "@/context/AuthContext";

function DateTime() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const [day, setDay] = useState("--");
  const [display, setDisplay] = useState("-----");

  const [hourDeg, setHourDeg] = useState<number | undefined>();
  const [minDeg, setMinDeg] = useState<number | undefined>();
  const [secDeg, setSecDeg] = useState<number | undefined>();

  const [is12, setIs12] = useState(false);

  const { userData } = useAuth();

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

  const checkHours = () => {
    if (is12) {
      if (+hours % 12 === 0) {
        return "12";
      } else if (+hours > 12 && +hours < 22) {
        return "0" + (+hours % 12);
      } else if (+hours >= 22 && +hours <= 23) {
        return +hours % 12;
      } else {
        return hours;
      }
    } else {
      return hours;
    }
  };

  return (
    <Widget className="">
      {day === "--" ? (
        <Loader />
      ) : (
        <>
          {/* 12 OR 24 HOUR TIME CHOICE */}
          <div className="flex justify-end gap-2.5 items-end">
            <button
              onClick={() => setIs12(false)}
              disabled={!is12}
              className={`${
                !is12
                  ? "text-[5vw] opacity-100"
                  : "text-[4.3vw] opacity-50 cursor-pointer"
              } leading-[1] cursor-pointer`}
            >
              24
            </button>
            <button
              onClick={() => setIs12(true)}
              disabled={is12}
              className={`${
                !is12
                  ? "text-[4.3vw] opacity-50 cursor-pointer"
                  : "text-[5vw] opacity-100"
              } leading-[1]`}
            >
              12
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <div className={`flex ${is12 ? "gap-1" : "gap-5"}`}>
              <div
                className={`flex items-start ${
                  userData?.style === "default" ? "classic gap-2" : "elegant gap-0"
                }`}
              >
                {/* CHECKS IF IT'S A 24 OR 12 HOUR CLOCK AND PRINTS THE  */}
                {/* APPROPRIATE TIME */}
                <div
                  className={`${
                    userData?.style === "default"
                      ? "text-[30.5vw] leading-[.8]"
                      : "text-[38vw] leading-[.7]"
                  } flex-1 flex flex-col justify-start items-center`}
                >
                  <p className="">{checkHours()}</p>
                  <p className="">{minutes}</p>
                </div>
                {/* DISPLAYS 'AM' OR 'PM' */}
                <div
                  className={`${is12 ? "block" : "hidden"} leading-[1] ${
                    userData?.style === "default"
                      ? "text-[6vw]"
                      : "text-[6.5vw]"
                  }`}
                >
                  <p className="">{+hours < 12 ? "AM" : "PM"}</p>
                </div>
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
          </div>
        </>
      )}
    </Widget>
  );
}

export default DateTime;
