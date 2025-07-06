import { days, months } from "./data";
export function fullTime() {
    const date = new Date();
    let hours = "";
    let minutes = "";
    if (date.getHours() < 10) {
        hours += "0" + date.getHours();
    }
    else {
        hours += date.getHours();
    }
    if (date.getMinutes() < 10) {
        minutes += "0" + date.getMinutes();
    }
    else {
        minutes += date.getMinutes();
    }
    return {
        hours,
        minutes,
    };
}
export function fullDate() {
    const date = new Date();
    let dayOfWeek = days[date.getDay()];
    let display = months[date.getMonth()].slice(0, 3) +
        ". " +
        date.getDate() +
        ", " +
        date.getFullYear();
    return {
        day: dayOfWeek,
        display,
    };
}
