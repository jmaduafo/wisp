import React, { Fragment, useEffect } from "react";
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
import { v4 as uuid } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

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

  const getUID = async () => {
    const uid = localStorage.getItem("wisp_uid");

    if (!uid) {
      try {
        localStorage.setItem("wisp_uid", uuid());

        const newId = localStorage.getItem("wisp_uid");

        if (!newId) {
          return;
        }

        const userRef = doc(db, "users", newId);

        await setDoc(userRef, {
          id: newId,
          name: null,
          primary_color: "#A65858",
          secondary_color: "#FEDBCD",
          style: "default",
          created_at: serverTimestamp(),
          updated_at: null,
        });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };


  useEffect(() => {
    getUID();
  }, []);

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
