import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainMenu from "./components/pages/main-menu/MainMenu";
import Weather from "./components/pages/weather/Weather";
import DateTime from "./components/pages/date-time/DateTime";
import Misc from "./components/pages/misc/Misc";
import MusicPlayer from "./components/pages/music-player/MusicPlayer";
import ToDo from "./components/pages/to-do/ToDo";
import Album from "./components/pages/album/Album";
import { Toaster } from "sonner";

function App() {
  const { pathname } = useLocation();

  return (
    <div
      className={`${
        pathname === "/" ? "bg-bgColor text-textColor" : "bg-red-300 text-white"
      } h-screen classic`}
    >
      <main className={`h-full`}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/date-time" element={<DateTime />} />
          <Route path="/music-player" element={<MusicPlayer />} />
          <Route path="/to-do" element={<ToDo />} />
          <Route path="/album" element={<Album />} />
          <Route path="/misc" element={<Misc />} />
        </Routes>

        <Toaster />
      </main>
    </div>
  );
}

export default App;
