export function calculatorFormat (num: number) {
     const format = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9 });
     return format.format(num)
}