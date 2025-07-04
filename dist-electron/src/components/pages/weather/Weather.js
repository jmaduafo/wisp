import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useState, useEffect } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherForecast, weatherIcon } from "@/utils/data";
import WeatherCard from "./WeatherCard";
import { celsiusToFahrenheit, currentLocation, round } from "@/utils/weather";
function Weather() {
    const [isCelsius, setIsCelsius] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getWeather = async () => {
        try {
            setLoading(true);
            currentLocation().then(async (coords) => {
                if (coords) {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min&current=is_day,weather_code,temperature_2m`);
                    if (!response.ok)
                        throw new Error("Weather fetch failed");
                    const rawData = await response.json();
                    console.log("Raw Open-Meteo response:", rawData);
                    setData(rawData);
                }
            });
        }
        catch (err) {
            console.error("Error fetching weather data:", err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getWeather();
    }, []);
    return (_jsx(Widget, { children: !data ? (_jsx("div", { children: "loading..." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-end gap-2.5 items-end", children: [_jsx("button", { onClick: () => setIsCelsius(true), disabled: isCelsius, className: `${isCelsius
                                ? "text-[5vw] opacity-100"
                                : "text-[4.3vw] opacity-50 cursor-pointer"} leading-[1] cursor-pointer`, children: "C" }), _jsx("button", { onClick: () => setIsCelsius(false), disabled: !isCelsius, className: `${isCelsius
                                ? "text-[4.3vw] opacity-50 cursor-pointer"
                                : "text-[5vw] opacity-100"} leading-[1]`, children: "F" })] }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-start justify-center gap-3 mt-3", children: [weatherIcon(data?.current?.weather_code, data.current.is_day, "w-[18vw] h-[18vw]", 1.5), _jsxs("div", { children: [_jsxs("div", { className: "flex items-end gap-2", children: [_jsxs("div", { className: "flex items-start", children: [_jsx("h1", { className: "elegant text-[25vw] leading-[.8]", children: isCelsius
                                                                ? round(data?.current?.temperature_2m)
                                                                : celsiusToFahrenheit(data?.current?.temperature_2m) }), _jsx("h3", { className: "elegant text-[15vw] leading-[1]", children: "\u00B0" })] }), _jsx("div", { children: _jsxs("p", { className: "text-[4.5vw] opacity-75 font-light", children: [isCelsius
                                                                ? Math.floor(data?.daily?.temperature_2m_min[0])
                                                                : celsiusToFahrenheit(data?.daily?.temperature_2m_min[0]), " ", "\u00B0 |", " ", isCelsius
                                                                ? Math.ceil(data?.daily?.temperature_2m_max[0])
                                                                : celsiusToFahrenheit(data?.daily?.temperature_2m_max[0]), " ", "\u00B0"] }) })] }), _jsxs("div", { className: "font-light", children: [_jsx("p", { className: "text-[5vw] leading-[1]", children: "San Francisco" }), _jsx("p", { className: "text-[4.6vw] opacity-70 leading-[1] mt-0.5", children: weatherForecast(data?.current?.weather_code) })] })] })] }), _jsx("div", { className: "overflow-auto mt-auto scrollBar", children: _jsx("div", { className: "w-fit flex gap-3", children: [6, 0, 1, 2, 3, 4, 5].map((item, i) => {
                                    return (_jsx(Fragment, { children: _jsx(WeatherCard, { day: item }) }, `item_${i + 1}`));
                                }) }) })] })] })) }));
}
export default Weather;
