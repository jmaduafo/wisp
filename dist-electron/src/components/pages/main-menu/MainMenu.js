import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { CloudDrizzle, GalleryVerticalEnd, Clock4, Music, List, BookUser, } from "lucide-react";
import { v4 as uuid } from "uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import MenuDisplay from "@/components/ui/menu/MenuDisplay";
function MainMenu() {
    const nav = [
        {
            title: "Weather",
            navLink: "weather",
            icon: _jsx(CloudDrizzle, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Date & time",
            navLink: "date-time",
            icon: _jsx(Clock4, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Music player",
            navLink: "music-player",
            icon: _jsx(Music, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "To do list",
            navLink: "to-do",
            icon: _jsx(List, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Album",
            navLink: "album",
            icon: _jsx(BookUser, { className: "w-7 h-7", strokeWidth: 1 }),
        },
        {
            title: "Misc",
            navLink: "misc/menu",
            icon: _jsx(GalleryVerticalEnd, { className: "w-7 h-7", strokeWidth: 1 }),
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
            }
            catch (err) {
                console.log(err.message);
            }
        }
    };
    useEffect(() => {
        getUID();
    }, []);
    return (_jsx(MenuDisplay, { title: "Main Menu", array: nav }));
}
export default MainMenu;
