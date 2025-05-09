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
      return index === 0 ? secondaryColor : secondaryColor + "50";
    } else {
      return index === 0 ? primaryColor : primaryColor + "50";
    }
  }
}

export function checkText({
  primaryColor,
  secondaryColor,
  is_primary,
}: ComponentStyle) {
  if (
    primaryColor &&
    primaryColor.length &&
    secondaryColor &&
    secondaryColor.length
  ) {
    if (is_primary) {
      return primaryColor;
    } else {
      return secondaryColor;
    }
  }
}
