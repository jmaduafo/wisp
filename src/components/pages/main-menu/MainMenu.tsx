import React, { Fragment } from "react";
import MenuCard from "./MenuCard";
import {
  CloudDrizzle,
  GalleryVerticalEnd,
  Clock4,
  Music,
  List,
  BookUser,
} from "lucide-react";
import Header1 from "../../ui/headings/Header1";

function MainMenu() {
  const nav = [
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
    <section className="flex items-end h-full">
      <div className="w-full">
        <div className="mb-4 border-b-[2px] border-b-textColor py-0.5 w-fit">
          <Header1 text="Main Menu" className="font-medium" />
        </div>
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
    </section>
  );
}

export default MainMenu;
