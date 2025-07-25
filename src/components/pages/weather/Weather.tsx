import React, { Fragment, useState, useEffect } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherForecast, weatherIcon } from "@/utils/data";
import WeatherCard from "./WeatherCard";
import { celsiusToFahrenheit, round } from "@/utils/weather";
import Loader from "@/components/ui/loading/Loader";
import { useAuth } from "@/context/AuthContext";
import { RefreshCw } from "lucide-react";

function Weather() {
  const [isCelsius, setIsCelsius] = useState(true);

  const [isRefreshed, setIsRefreshed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<any>();
  const [location, setLocation] = useState("");

  const { userData } = useAuth();

  const getWeather = async () => {
    try {
      const location = await getLocation();

      if (!location?.latitude || !location?.longitude) {
        console.log("Could not get location");
        return;
      }

      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=is_day,weather_code,temperature_2m`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Parsed data", data);
          setData(data); // or your transformed data structure
          setLocation(location?.city);
        })
        .catch((err) => {
          console.error("Error fetching weather:", err);
        });
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  const getLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
      };
    } catch (err) {
      console.error("Error fetching location:", err);
      return null;
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    getWeather();
    setIsLoading(false)
  }, [isRefreshed]);

  return (
    <Widget>
      {!data ? (
        <Loader />
      ) : (
        <>
          {/* CELSIUS & FAHRENHEIT SWITCH */}
          <div className="flex justify-between items-start">
            <div>
              {/* <button className={`${isLoading ? "animate-spin" : "animate-none"} cursor-pointer`} onClick={() => setIsRefreshed(prev => !prev)}>
                <RefreshCw className="w-[5.5vw] h-[5.5vw]"/>
              </button> */}

            </div>
            <div className="flex gap-2.5 items-end">
              <button
                onClick={() => setIsCelsius(true)}
                disabled={isCelsius}
                className={`${
                  isCelsius
                    ? "text-[5vw] opacity-100"
                    : "text-[4.3vw] opacity-50 cursor-pointer"
                } leading-[1] cursor-pointer`}
              >
                C
              </button>
              <button
                onClick={() => setIsCelsius(false)}
                disabled={!isCelsius}
                className={`${
                  isCelsius
                    ? "text-[4.3vw] opacity-50 cursor-pointer"
                    : "text-[5vw] opacity-100"
                } leading-[1]`}
              >
                F
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-center gap-3 mt-3">
              {/* WEATHER FORECAST ICON */}
              {weatherIcon(
                data?.current?.weather_code,
                data.current.is_day,
                "w-[18vw] h-[18vw]",
                1.5
              )}
              <div>
                <div className="flex items-end gap-2">
                  {/* CURRENT TEMPERATURE */}
                  <div className="flex items-start gap-2">
                    <h1
                      className={`${
                        userData?.style === "default"
                          ? "classic text-[20vw] leading-[1]"
                          : "elegant text-[25vw] leading-[.8]"
                      }`}
                    >
                      {isCelsius
                        ? round(data?.current?.temperature_2m)
                        : celsiusToFahrenheit(data?.current?.temperature_2m)}
                    </h1>
                    <h3 className="elegant text-[15vw] leading-[1]">&deg;</h3>
                  </div>
                  {/* MIN AND MAX CURRENT TEMPERATURE */}
                  <div>
                    <p className="text-[4.5vw] opacity-75 font-light">
                      {isCelsius
                        ? Math.floor(data?.daily?.temperature_2m_min[0])
                        : celsiusToFahrenheit(
                            data?.daily?.temperature_2m_min[0]
                          )}{" "}
                      &deg; |{" "}
                      {isCelsius
                        ? Math.ceil(data?.daily?.temperature_2m_max[0])
                        : celsiusToFahrenheit(
                            data?.daily?.temperature_2m_max[0]
                          )}{" "}
                      &deg;
                    </p>
                  </div>
                </div>
                <div className="font-light">
                  {/* USER LOCATION & WEATHER FORECAST DESCRIPTION */}
                  <p className="text-[5vw] leading-[1]">
                    {location.length ? location : "--"}
                  </p>
                  <p className="text-[4.6vw] opacity-70 leading-[1] mt-0.5">
                    {weatherForecast(data?.current?.weather_code)}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-auto mt-auto scrollBar">
              {/* SCROLLING DAILY FORECAST FOR THE WEEK */}
              <div className="w-fit flex gap-3">
                {data?.daily?.temperature_2m_max
                  ? data?.daily?.temperature_2m_max.map(
                      (item: number, i: number) => {
                        return (
                          <Fragment key={`${item}_${i + 1}`}>
                            <WeatherCard
                              temp={
                                isCelsius
                                  ? round(item)
                                  : celsiusToFahrenheit(item)
                              }
                              code={data?.daily?.weather_code[i]}
                              day={data?.daily?.time[i]}
                              today={data?.daily?.time[i]}
                            />
                          </Fragment>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
          </div>
        </>
      )}
    </Widget>
  );
}

export default Weather;
