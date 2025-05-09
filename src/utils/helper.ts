import { ComponentStyle } from "../types/types";

export function checkStyle({
  primaryColor,
  secondaryColor,
  is_glassomorphic,
  is_primary,
//   index
}: ComponentStyle) {
  if (primaryColor && primaryColor.length && secondaryColor && secondaryColor.length ) {
    if (is_primary && is_glassomorphic) {
      return `text-[${primaryColor}] bg- backdrop-blur-3xl`;
    } else if (!is_primary && is_glassomorphic) {
      return `text-[${secondaryColor}] bg- backdrop-blur-3xl`;
    } else if (is_primary && !is_glassomorphic) {
        return `text-[${primaryColor}] bg-[${secondaryColor}] backdrop-blur-3xl`;
    } else {
        return `text-[${secondaryColor}] bg-[${primaryColor}] backdrop-blur-3xl`;
    }
  } else if (primaryColor && primaryColor.length && !secondaryColor) {
      return `text-[${primaryColor}] bg- backdrop-blur-3xl`;
  }

  return "bg-textColor text-bgColor";
}
