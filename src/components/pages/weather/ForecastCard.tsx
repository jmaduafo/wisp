import React from "react";
import {
  checkBackground,
  checkGlassomorphism,
  checkText,
} from "../../../utils/helper";
import Header6 from "../../ui/headings/Header6";
import { weatherIcons } from "../../../utils/data";

type CardProp = {
  top_text: string;
  icon: number;
  temp: number;
  index: number;
  is_glassomorphic?: boolean;
  is_primary?: boolean;
  primary_color?: string;
  secondary_color?: string;
};

function ForecastCard({
  top_text,
  icon,
  temp,
  index,
  is_glassomorphic,
  is_primary,
  secondary_color,
  primary_color,
}: CardProp) {
  return (
    <div
      className={`rounded-md px-4 py-1.5 backdrop-blur-xl ${checkGlassomorphism(
        is_glassomorphic,
        index
      )}`}
      style={{
        color: checkText({
          primaryColor: primary_color,
          secondaryColor: secondary_color,
          is_primary,
        }),
        backgroundColor: checkBackground({
          primaryColor: primary_color,
          secondaryColor: secondary_color,
          is_glassomorphic,
          is_primary,
          index,
        }),
      }}
    >
      {/* DAY */}
      <Header6 text={top_text} className="text-center font-light" />
      {/* WEATHER ICON */}
      <div className="my-1 flex justify-center">{weatherIcons(icon, 1)}</div>
      {/* TEMPERATURE */}
      <p className="text-center whitespace-nowrap font-light">{temp} &#176;</p>
    </div>
  );
}

export default ForecastCard;
