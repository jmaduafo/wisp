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
export function analogTime() {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    let hDeg = hours * 30 + mins * (360 / 720);
    let mDeg = mins * 6 + secs * (360 / 3600);
    let sDeg = secs * 6;
    return {
        hours: hDeg,
        minutes: mDeg,
        seconds: sDeg
    };
}
