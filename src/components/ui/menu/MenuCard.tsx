import Header4 from "../headings/Header4";
import React from "react";
import { useNavigate } from "react-router-dom";

function MenuCard({
  title,
  icon,
  link,
}: {
  readonly title: string;
  readonly icon: React.ReactNode;
  readonly link: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        title.toLowerCase() === "misc"
          ? navigate(`/${link}`)
          : window.api.openWidget(`${link}`, `${link}`)
      }
      className="cursor-pointer hover:opacity-70 duration-300 w-full h-[150px] flex flex-col px-4 py-3 rounded-lg bg-bgColor shadow-lg"
    >
      <div>
        <Header4 text={title} className="capitalize text-left" />
      </div>
      <div className="mt-auto flex justify-end">{icon}</div>
    </button>
  );
}

export default MenuCard;
