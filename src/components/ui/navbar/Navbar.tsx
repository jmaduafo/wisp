import React from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import Header4 from "../headings/Header4";

function NavBar() {
  return (
    <header className="flex justify-between items-center">
      {/* LOGO WITH GREETING */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-textColor text-bgColor">
          <h3 className="logo text-lg">w</h3>
        </div>
        <Header4 text="Hello"/>
      </div>
      {/* SETTINGS */}
      <button>
        <Cog8ToothIcon className="w-6"/>
      </button>
    </header>
  );
}

export default NavBar;
