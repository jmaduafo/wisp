import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Controls from "./components/ui/controls/Controls";
import NavBar from "./components/ui/navbar/Navbar";
import MainMenu from "./components/pages/main-menu/MainMenu";

function App() {
  return (
    <div className="bg-bgColor text-textColor h-screen classic">
      <Router>
        <Controls />
        <div className="px-6">
          <NavBar />
          <main className="h-[88vh]">
            <Routes>
              <Route path="/" element={<MainMenu />}  />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
