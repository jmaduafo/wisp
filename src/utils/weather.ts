export function fahrenheitToCelsius(num) {
    return Math.ceil((num - 32) * (5 / 9))
}

export function celsiusToFahrenheit(num) {
    return Math.ceil((num + 32) * (5 / 9))
}