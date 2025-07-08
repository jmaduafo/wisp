import React from "react";
import Settings from "./settings/Settings";
import { useAuth } from "@/context/AuthContext";
import Header5 from "../headings/Header5";

function NavBar() {
  const { userData } = useAuth()

  return (
    <header className="flex justify-between items-center">
      {/* LOGO WITH GREETING */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-textColor text-bgColor">
          <h3 className="logo text-lg">w</h3>
        </div>
        {userData?.name ? <Header5 text={`Hello, ${userData.name}`}/> : null}
      </div>
      {/* SETTINGS */}
      <Settings/>
    </header>
  );
}

export default NavBar;
