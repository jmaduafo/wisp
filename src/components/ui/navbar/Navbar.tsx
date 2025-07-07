import React from "react";
import Header4 from "../headings/Header4";
import Settings from "./settings/Settings";
import { User } from "@/types/types";

function NavBar({ user }: { readonly user: User | undefined}) {
  return (
    <header className="flex justify-between items-center">
      {/* LOGO WITH GREETING */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-textColor text-bgColor">
          <h3 className="logo text-lg">w</h3>
        </div>
        {user?.name ? <Header4 text={`Hello, ${user.name}`}/> : null}
      </div>
      {/* SETTINGS */}
      <Settings user={user}/>
    </header>
  );
}

export default NavBar;
