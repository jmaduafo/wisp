import React, { Fragment } from "react";
import ForecastCard from "../ForecastCard";

function SevenDay1() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollBar">
      {[0, 1, 2, 3, 4, 5, 6].map((_, i) => {
        return (
          <Fragment key={`${i + 1}`}>
            {/* <ForecastCard /> */}
          </Fragment>
        );
      })}
    </div>
  );
}

export default SevenDay1;
