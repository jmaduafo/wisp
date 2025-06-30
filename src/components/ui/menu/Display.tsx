import React, { Fragment } from "react";
import Header1 from "../headings/Header1";
import MenuCard from "./MenuCard";
import { Nav } from "../../../types/types";
import NavBar from "../navbar/Navbar";

type Prop = {
  text: string;
  array: Nav[];
};

function Display({ text, array }: Prop) {
  return (
    <section className="h-full flex flex-col">
      <NavBar />
      <div className="mt-6 border-b-[2px] border-b-textColor w-fit">
        <Header1 text={text} className="font-medium" />
      </div>
      <div className="mt-auto w-full">
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
    </section>
  );
}

export default Display;
