import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useState, useEffect } from "react";
import Widget from "@/components/ui/widget/Widget";
import { weatherForecast, weatherIcon } from "@/utils/data";
import WeatherCard from "./WeatherCard";
import { celsiusToFahrenheit, round, weatherDate } from "@/utils/weather";
import Loader from "@/components/ui/loading/Loader";
function Weather() {
    const [isCelsius, setIsCelsius] = useState(true);
    const [data, setData] = useState();
    const [location, setLocation] = useState("");
    const getWeather = async () => {
        try {
            const location = await getLocation();
            if (!location?.latitude || !location?.longitude) {
                console.log("Could not get location");
                return;
            }
            await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=is_day,weather_code,temperature_2m`)
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
        }
        catch (err) {
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
        }
        catch (err) {
            console.error("Error fetching location:", err);
            return null;
        }
    };
    useEffect(() => {
        getWeather();
    }, []);
    return (_jsx(Widget, { children: !data ? (_jsx(Loader, {})) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-end gap-2.5 items-end", children: [_jsx("button", { onClick: () => setIsCelsius(true), disabled: isCelsius, className: `${isCelsius
                                ? "text-[5vw] opacity-100"
                                : "text-[4.3vw] opacity-50 cursor-pointer"} leading-[1] cursor-pointer`, children: "C" }), _jsx("button", { onClick: () => setIsCelsius(false), disabled: !isCelsius, className: `${isCelsius
                                ? "text-[4.3vw] opacity-50 cursor-pointer"
                                : "text-[5vw] opacity-100"} leading-[1]`, children: "F" })] }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-start justify-center gap-3 mt-3", children: [weatherIcon(data?.current?.weather_code, data.current.is_day, "w-[18vw] h-[18vw]", 1.5), _jsxs("div", { children: [_jsxs("div", { className: "flex items-end gap-2", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("h1", { className: "elegant text-[25vw] leading-[.8]", children: isCelsius
                                                                ? round(data?.current?.temperature_2m)
                                                                : celsiusToFahrenheit(data?.current?.temperature_2m) }), _jsx("h3", { className: "elegant text-[15vw] leading-[1]", children: "\u00B0" })] }), _jsx("div", { children: _jsxs("p", { className: "text-[4.5vw] opacity-75 font-light", children: [isCelsius
                                                                ? Math.floor(data?.daily?.temperature_2m_min[0])
                                                                : celsiusToFahrenheit(data?.daily?.temperature_2m_min[0]), " ", "\u00B0 |", " ", isCelsius
                                                                ? Math.ceil(data?.daily?.temperature_2m_max[0])
                                                                : celsiusToFahrenheit(data?.daily?.temperature_2m_max[0]), " ", "\u00B0"] }) })] }), _jsxs("div", { className: "font-light", children: [_jsx("p", { className: "text-[5vw] leading-[1]", children: location.length ? location : "--" }), _jsx("p", { className: "text-[4.6vw] opacity-70 leading-[1] mt-0.5", children: weatherForecast(data?.current?.weather_code) })] })] })] }), _jsx("div", { className: "overflow-auto mt-auto scrollBar", children: _jsx("div", { className: "w-fit flex gap-3", children: data?.daily?.temperature_2m_max
                                    ? data?.daily?.temperature_2m_max.map((item, i) => {
                                        return (_jsx(Fragment, { children: _jsx(WeatherCard, { temp: isCelsius
                                                    ? round(item)
                                                    : celsiusToFahrenheit(item), code: data?.daily?.weather_code[i], day: weatherDate(data?.daily?.time[i]), today: data?.daily?.time[i] }) }, `${item}_${i + 1}`));
                                    })
                                    : null }) })] })] })) }));
}
export default Weather;
