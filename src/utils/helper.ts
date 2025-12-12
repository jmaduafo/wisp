import { ComponentStyle } from "../types/types";

export function checkGlassomorphism(
  is_glassomorphic: boolean | undefined,
  index: number
) {
  if (is_glassomorphic) {
    return index === 0 ? `bg-white/50` : `bg-white/10`;
  }
}

export function checkBackground({
  primaryColor,
  secondaryColor,
  is_glassomorphic,
  is_primary,
  index,
}: ComponentStyle) {
  if (
    !is_glassomorphic &&
    primaryColor &&
    primaryColor.length &&
    secondaryColor &&
    secondaryColor.length
  ) {
    if (is_primary) {
      return index === 0 ? secondaryColor : secondaryColor + "90";
    } else {
      return index === 0 ? primaryColor : primaryColor + "90";
    }
  }
}


export function capitalize(text: string) {
  const split = text.split(" ")

  let new_text: string[] = []

  split.forEach(word => {
    new_text.push(word.charAt(0).toUpperCase() + word.slice(1))
  })
  
  return new_text.join(" ")
}

export function sortArray(array: any[], key: string) {
  // Set all the values of the entered key to an array of
  // of only the values
  const arr = array.map(item => item[key])
  
  // Sort the array in descending order
  const sorted = arr.sort()

  const sortedArr: any[] = []

  sorted.forEach(item => {
    // Find where the item in sorted array is found
    // in the original array

    // Then append the object to the new array
    const findItem = array.find(obj => obj[key] === item)

    if (!findItem) {
      return
    }

    sortedArr.push(findItem)
  })

  return sortedArr

}
