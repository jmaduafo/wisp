import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Controls from "./components/ui/controls/Controls";
import NavBar from "./components/ui/navbar/Navbar";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import Misc from "./components/pages/misc/Misc";
import Back from "./components/ui/menu/Back";
import CarouselPage from "./components/ui/menu/CarouselPage";

function App() {
  const { pathname } = useLocation()

  return (
    <div className="bg-bgColor text-textColor h-screen classic">
      <Controls />
      <div className="px-6">
        <NavBar />
        <main className={`${pathname === "/" ? "h-[88vh]" : "h-[83vh]"}`}>
          <div className="h-full">
            {pathname !== "/" && <Back />}
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/date-time" element={<DateTime />} />
              <Route path="/music-player" element={<CarouselPage/>} />
              <Route path="/to-do" element={<CarouselPage/>} />
              <Route path="/album" element={<CarouselPage/>} />
              <Route path="/misc" element={<Misc />} />
              <Route path="/weather/:name" element={<CarouselPage/>} />
              <Route path="/date-time/:name" element={<CarouselPage/>} />
              <Route path="/music-player/:name" element={<CarouselPage/>} />
              <Route path="/misc/:name" element={<CarouselPage/>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
