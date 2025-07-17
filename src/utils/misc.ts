export function calculatorFormat (num: number) {
     const format = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9 });
     return format.format(num)
}

export function countdownFormat(duration: number) {
    const hours = Math.floor(duration / 3600)
    const hoursRemainder = (duration / 3600) - hours
    const minutes = Math.floor(hoursRemainder * 60)
    const minutesRemainder = (hoursRemainder * 60) - minutes
    const seconds = Math.round(minutesRemainder * 60)
    

    let hoursFormat = hours < 10 ? "0" + hours : hours
    let minutesFormat = minutes < 10 ? "0" + minutes : minutes
    let secondsFormat = seconds < 10 ? "0" + seconds : seconds

    return hoursFormat + " : " + minutesFormat + " : " + secondsFormat
}

export function secondsFormat(hour: number, minute: number, second: number) {
    const hours = hour * 3600
    const minutes = minute * 60
    const seconds = second

    let duration = hours + minutes + seconds

    return duration

}