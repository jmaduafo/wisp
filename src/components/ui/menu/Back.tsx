import React from "react";
import Header6 from "../headings/Header6";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Back() {
  const navigate = useNavigate();

  return (
    <button
      className="mt-2 cursor-pointer flex justify-end w-full"
      onClick={() => navigate(-1)}
    >
      <div className="flex items-center gap-2 group w-fit">
        <ArrowLeft
          strokeWidth={1}
          className="w-5 h-5 group-hover:-translate-x-1 duration-300"
        />
        <Header6 text="Back" />
      </div>
    </button>
  );
}

export default Back;
