import { Link } from "react-router-dom";
import Header4 from "../../ui/headings/Header4";
import React from "react";

function MenuCard({
  title,
  icon,
  link
}: {
  readonly title: string;
  readonly icon: React.ReactNode;
  readonly link: string
}) {
  return (
    <Link to={`/${link}`}>
    <div className="cursor-pointer hover:opacity-70 duration-300 w-full h-[150px] flex flex-col px-4 py-3 rounded-lg bg-bgColor shadow-lg">
      <div>
        <Header4 text={title} className="capitalize"/>
      </div>
      <div className="mt-auto flex justify-end">
        {icon}
      </div>
    </div>
    </Link>
  );
}

export default MenuCard;
