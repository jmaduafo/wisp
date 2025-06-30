import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import Misc from "./components/pages/misc/Misc";
import CarouselPage from "./components/ui/menu/CarouselPage";

function App() {
  const { pathname } = useLocation();

  return (
    <div
      className={`${
        pathname === "/" ? "bg-bgColor text-textColor" : "bg-transparent"
      } h-screen classic`}
    >
      <main className={`${pathname === "/" ? "h-[88vh]" : "h-[83vh]"}`}>
        <div className="h-full">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/date-time" element={<DateTime />} />
            <Route path="/music-player" element={<CarouselPage />} />
            <Route path="/to-do" element={<CarouselPage />} />
            <Route path="/album" element={<CarouselPage />} />
            <Route path="/misc" element={<Misc />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
