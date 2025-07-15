export function calculatorFormat (num: number) {
     const format = new Intl.NumberFormat('en-US');
     return format.format(num)
}