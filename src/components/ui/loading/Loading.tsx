import { useAuth } from "@/context/AuthContext";
import React from "react";

function Loading({ className }: { readonly className: string }) {
  const { userData } = useAuth();

  return (
    <div
      className="w-[4.5vw] h-[4.5vw] rounded-full border border-transparent animate-spin"
      style={{
        borderTopColor: userData ? userData.secondary_color : "#2D2929",
      }}
    ></div>
  );
}

export default Loading;
