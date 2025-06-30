export function fahrenheitToCelsius(num: number) {
    return Math.ceil((num - 32) * (5 / 9))
}

export function celsiusToFahrenheit(num: number) {
    return Math.ceil((num + 32) * (5 / 9))
}