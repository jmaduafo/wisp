import React, { useEffect } from "react";
import {
  CloudDrizzle,
  GalleryVerticalEnd,
  Clock4,
  Music,
  List,
  BookUser,
} from "lucide-react";
import { Nav } from "../../../types/types";
import { v4 as uuid } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import MenuDisplay from "@/components/ui/menu/MenuDisplay";

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
      title: "Misc",
      navLink: "misc/menu",
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
          album: [],
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
    <MenuDisplay title="Main Menu" array={nav}/>
  );
}

export default MainMenu;
