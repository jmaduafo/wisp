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
import { useAuth } from "./context/AuthContext";
import MiniGame from "./components/pages/misc/links/MiniGame";
import Calendar from "./components/pages/misc/links/Calendar";
import Timer from "./components/pages/misc/links/Timer";
import Quote from "./components/pages/misc/links/Quote";
import Quiz from "./components/pages/misc/links/Quiz";
import Calculator from "./components/pages/misc/links/Calculator";

function App() {
  const { pathname } = useLocation();
  const { userData } = useAuth();

  return (
    <div
      className={`h-screen classic`}
      style={{
        backgroundColor:
          userData && (pathname !== "/" && !pathname.includes("menu")) ? userData.primary_color : "#F7EAE4",
        color:
          userData && (pathname !== "/" && !pathname.includes("menu"))  ? userData.secondary_color : "#2D2929",
      }}
    >
      <main className={`h-full`}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/date-time" element={<DateTime />} />
          <Route path="/music-player" element={<MusicPlayer />} />
          <Route path="/to-do" element={<ToDo />} />
          <Route path="/album" element={<Album />} />
          <Route path="/misc/menu" element={<Misc />} />
          <Route path="/misc/game" element={<MiniGame />} />
          <Route path="/misc/calculator" element={<Calculator />} />
          <Route path="/misc/calendar" element={<Calendar />} />
          <Route path="/misc/timer" element={<Timer />} />
          <Route path="/misc/quote" element={<Quote />} />
          <Route path="/misc/quiz" element={<Quiz />} />
        </Routes>

        <Toaster />
      </main>
    </div>
  );
}

export default App;
