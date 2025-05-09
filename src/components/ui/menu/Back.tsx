import React from "react";
import Header6 from "../headings/Header6";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Back() {
  const navigate = useNavigate();

  return (
    <div className="mt-2 flex justify-end w-full">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-center gap-2 group w-fit"
      >
        <ArrowLeft
          strokeWidth={1}
          className="w-5 h-5 group-hover:-translate-x-1 duration-300"
        />
        <Header6 text="Back" />
      </button>
    </div>
  );
}

export default Back;
