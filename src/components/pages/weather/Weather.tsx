import React, { Fragment, useState, useEffect } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherForecast, weatherIcon } from "@/utils/data";
import WeatherCard from "./WeatherCard";
import { celsiusToFahrenheit, currentLocation, round, weatherDate } from "@/utils/weather";

function Weather() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [location, setLocation] = useState("");

  const getWeather = async () => {
    try {
      setLoading(true);

      currentLocation().then(async (coords) => {
        if (coords) {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=is_day,weather_code,temperature_2m`
          );

          if (!response.ok) throw new Error("Weather fetch failed");

          const rawData = await response.json();
          console.log("Raw Open-Meteo response:", rawData);
          setData(rawData);
        }
      });
    } catch (err) {
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      setLoading(true);

      await fetch("https://ipapi.co/city/")
        .then(function (response) {
          response.text().then((txt) => {
            setLocation(txt);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
    getLocation();
  }, []);

  return (
    <Widget>
      {!data ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="flex justify-end gap-2.5 items-end">
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
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-center gap-3 mt-3">
              {weatherIcon(
                data?.current?.weather_code,
                data.current.is_day,
                "w-[18vw] h-[18vw]",
                1.5
              )}
              <div>
                <div className="flex items-end gap-2">
                  <div className="flex items-start">
                    <h1 className="elegant text-[25vw] leading-[.8]">
                      {isCelsius
                        ? round(data?.current?.temperature_2m)
                        : celsiusToFahrenheit(data?.current?.temperature_2m)}
                    </h1>
                    <h3 className="elegant text-[15vw] leading-[1]">&deg;</h3>
                  </div>
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
              <div className="w-fit flex gap-3">
                {data?.daily?.temperature_2m_max
                  ? data?.daily?.temperature_2m_max.map(
                      (item: number, i: number) => {
                        return (
                          <Fragment key={`${item}_${i + 1}`}>
                            <WeatherCard
                              temp={
                                isCelsius ? round(item) : celsiusToFahrenheit(item)
                              }
                              code={data?.daily?.weather_code[i]}
                              day={weatherDate(data?.daily?.time[i])}
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
