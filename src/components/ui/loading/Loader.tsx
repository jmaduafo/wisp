import React from "react";
import { useAuth } from "@/context/AuthContext";

function Loader() {
  const { userData } = useAuth();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="w-[8vw] h-[8vw] rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: userData ? userData.secondary_color : "#2D2929",
        }}
      ></div>
    </div>
  );
}

export default Loader;
