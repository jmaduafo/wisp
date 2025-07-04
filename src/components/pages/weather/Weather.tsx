import React from "react";
import Widget from "@/components/ui/widget/Widget";

function Weather() {
  return (
    <Widget>
      <div className="h-full">
        <h1 className="text-center w-full text-[25vw]">9:30</h1>
      </div>
      <div className="w-10 h-10 "></div>
    </Widget>
  );
}

export default Weather;
