import React, { Fragment } from 'react'
import { dummy7Days } from '../../../../utils/data';
import ForecastCard from '../ForecastCard';

function SevenDummy4() {
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
            />
          </Fragment>
        );
      })}
    </div>
  )
}

export default SevenDummy4