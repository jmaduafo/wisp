import { SunMedium } from "lucide-react";
import React from "react";
import Paragraph from "../../ui/headings/Paragraph";
import { ComponentStyle } from "../../../types/types";
import { checkStyle } from "../../../utils/helper";

function ForecastCard({
  primaryColor,
  secondaryColor,
  is_glassomorphic,
}: ComponentStyle) {
  return (
    <div className={`rounded-md px-4 py-2 ${checkStyle({})}`}>
      {/* DAY */}
      <Paragraph text="Tue" className="text-center" />
      {/* WEATHER ICON */}
      <div className="my-1 flex justify-center">
        <SunMedium strokeWidth={1} className="w-7 h-7"/>
      </div>
      {/* TEMPERATURE */}
      <p className="text-center whitespace-nowrap">90 &#176;</p>
    </div>
  );
}

export default ForecastCard;
