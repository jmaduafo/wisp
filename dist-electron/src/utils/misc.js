export function calculatorFormat(num) {
    const format = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9 });
    return format.format(num);
}
export function countdownFormat(duration) {
    const hours = Math.floor(duration / 3600);
    const hoursRemainder = (duration / 3600) - hours;
    const minutes = Math.floor(hoursRemainder * 60);
    const minutesRemainder = (hoursRemainder * 60) - minutes;
    const seconds = Math.round(minutesRemainder * 60);
    let hoursFormat = hours < 10 ? "0" + hours : hours;
    let minutesFormat = minutes < 10 ? "0" + minutes : minutes;
    let secondsFormat = seconds < 10 ? "0" + seconds : seconds;
    return hoursFormat + " : " + minutesFormat + " : " + secondsFormat;
}
export function secondsFormat(hour, minute, second) {
    const hours = hour * 3600;
    const minutes = minute * 60;
    const seconds = second;
    let duration = hours + minutes + seconds;
    return duration;
}
export function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
export function difficulty(level) {
    if (level.toLowerCase() === "easy") {
        return 1;
    }
    else if (level.toLowerCase() === "medium") {
        return 2;
    }
    else {
        return 3;
    }
}
