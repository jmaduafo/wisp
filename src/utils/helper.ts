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
