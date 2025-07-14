import React, { Fragment } from "react";
import Controls from "../controls/Controls";
import NavBar from "../navbar/Navbar";
import { Nav } from "@/types/types";
import MenuCard from "./MenuCard";
import Header1 from "../headings/Header1";
import { useLocation } from "react-router-dom";
import Back from "./Back";

type Display = {
  readonly array: Nav[];
  readonly title: string;
};

function MenuDisplay({ array, title }: Display) {
  const { pathname } = useLocation();

  return (
    <section className="h-full">
      <Controls />
      <div className="px-6">
        <NavBar />
        {pathname.includes("menu") ? <Back /> : null}
        <div className="mt-6 my-4 border-b-[2px] border-b-textColor w-fit">
          <Header1 text={title} className="font-medium" />
        </div>
        <div className="mt-[2em] w-full">
          <div className="grid grid-cols-2 gap-3">
            {array.map((item) => {
              return (
                <Fragment key={item.navLink}>
                  <MenuCard
                    title={item.title}
                    icon={item.icon}
                    link={item.navLink}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuDisplay;
