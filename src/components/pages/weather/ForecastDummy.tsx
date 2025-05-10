import React, { Fragment } from "react";
import ForecastCard from "./ForecastCard";
import { ComponentStyle } from "../../../types/types";

function ForecastDummy({
  primaryColor,
  secondaryColor,
  is_glassomorphic,
  is_primary,
  index,
  data
}: ComponentStyle ) {
  return (
  <div className="grid grid-cols-3 gap-2 overflow-x-auto scrollBar">
        {data?.map((item, i) => {
          return (
            <Fragment key={`${item.top_text}`}>
              <ForecastCard
                top_text={item.top_text}
                icon={item.icon}
                temp={item.temp}
                index={i}
                primary_color={primaryColor}
                secondary_color={secondaryColor}
                is_glassomorphic={is_glassomorphic}
                is_primary={is_primary}
              />
            </Fragment>
          );
        })}
      </div>
);
}

export default ForecastDummy;
