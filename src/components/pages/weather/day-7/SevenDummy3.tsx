import React, { Fragment } from "react";
import ForecastCard from "../ForecastCard";
import { dummy7Days } from "../../../../utils/data";

export default function SevenDummy3() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollBar">
      {dummy7Days.map((item, i) => {
        return (
          <Fragment key={`${i + 1}`}>
            <ForecastCard
              top_text={item.day}
              icon={item.icon}
              temp={item.temp}
              index={i}
              primary_color="#ffffff"
              secondary_color="#ff0000"
              is_primary
            />
          </Fragment>
        );
      })}
    </div>
  );
}
