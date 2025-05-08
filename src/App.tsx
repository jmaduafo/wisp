import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Controls from "./components/ui/controls/Controls";
import NavBar from "./components/ui/navbar/Navbar";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import MusicPlayer from "./components/pages/music-player/MusicPlayer";
import ToDo from "./components/pages/to-do/ToDo";
import Misc from "./components/pages/misc/Misc";
import Album from "./components/pages/album/Album";
import Back from "./components/ui/menu/Back";

function App() {
  const location = useLocation().pathname;

  return (
    <div className="bg-bgColor text-textColor h-screen classic">
      <Controls />
      <div className="px-6">
        <NavBar />
        <main className={`${location === "/" ? "h-[88vh]" : "h-[83vh]"}`}>
          <div className="h-full">
            {location !== "/" && <Back />}
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/date-time" element={<DateTime />} />
              <Route path="/music-player" element={<MusicPlayer />} />
              <Route path="/to-do" element={<ToDo />} />
              <Route path="/album" element={<Album />} />
              <Route path="/misc" element={<Misc />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
