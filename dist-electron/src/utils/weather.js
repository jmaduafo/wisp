import { days } from "./data";
export function fahrenheitToCelsius(num) {
    return Math.round((num - 32) * (5 / 9));
}
export function celsiusToFahrenheit(num) {
    return Math.round((num * 9 / 5) + 32);
}
export function isToday(date) {
    const fullDate = new Date(date);
    const now = new Date();
    let is_today = fullDate.getDate() === now.getDate();
    return is_today;
}
export function weatherDate(day) {
    const date = new Date(day);
    const now = new Date();
    return now.getDay() === date.getDay() ? "Today" : days[date.getDay()].slice(0, 3);
}
export function currentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }, (error) => {
            console.error("Geolocation error:", error);
            resolve(null); // Or reject(error) if you want to handle errors upstream
        });
    });
}
export function round(decimal) {
    return Math.round(decimal);
}
