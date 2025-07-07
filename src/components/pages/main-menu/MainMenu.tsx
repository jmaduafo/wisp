import React, { Fragment } from "react";
import {
  CloudDrizzle,
  GalleryVerticalEnd,
  Clock4,
  Music,
  List,
  BookUser,
} from "lucide-react";
import { Nav } from "../../../types/types";
import NavBar from "../../ui/navbar/Navbar";
import MenuCard from "../../ui/menu/MenuCard";
import Controls from "../../ui/controls/Controls";

function MainMenu() {
  const nav: Nav[] = [
    {
      title: "Weather",
      navLink: "weather",
      icon: <CloudDrizzle className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Date & time",
      navLink: "date-time",
      icon: <Clock4 className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Music player",
      navLink: "music-player",
      icon: <Music className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "To do list",
      navLink: "to-do",
      icon: <List className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Album",
      navLink: "album",
      icon: <BookUser className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "misc",
      navLink: "misc",
      icon: <GalleryVerticalEnd className="w-7 h-7" strokeWidth={1} />,
    },
  ];

  return (
    <section className="h-full">
      <Controls />
      <div className="px-6">
        <NavBar />
        {/* <div className="mt-6 my-4 border-b-[2px] border-b-textColor w-fit">
          <Header1 text="Main menu" className="font-medium" />
        </div> */}
        <div className="mt-[6em] w-full">
          <div className="grid grid-cols-2 gap-3">
            {nav.map((item) => {
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

export default MainMenu;
