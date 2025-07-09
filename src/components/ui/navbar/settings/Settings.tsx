import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../button";
import { Switch } from "../../switch";
import { color_themes } from "@/utils/data";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Loading from "../../loading/ButtonLoading";

function Settings() {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);

  const [isStyled, setIsStyled] = useState(false);

  const [settings, setSettings] = useState({
    name: "",
    primary_color: "",
    secondary_color: "",
  });

  useEffect(() => {
    if (userData) {
      setSettings({
        name: userData?.name ?? "",
        primary_color: userData?.primary_color,
        secondary_color: userData?.secondary_color,
      });

      userData.style === "default" ? setIsStyled(false) : setIsStyled(true)
    }
  }, [userData?.id ?? "guest"]);

  const updateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!settings.name.length) {
      toast("Something went wrong", {
        description: "Please enter your name",
      });
    }

    try {
      setLoading(true)
      if (!userData) {
        return;
      }

      const userRef = doc(db, "users", userData?.id);

      await updateDoc(userRef, {
        name: settings.name,
        primary_color: settings.primary_color,
        secondary_color: settings.secondary_color,
        style: isStyled ? "wisp" : "default",
        updated_at: serverTimestamp(),
      });

      toast("Success!", {
        description: "Settings was updated successfully",
      });
    } catch (err: any) {
      toast("Something went wrong", {
        description: err.message,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="cursor-pointer">
            <Cog8ToothIcon className="w-6" />
          </button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <form className="" onSubmit={updateSettings}>
            <div className="p-2">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="border-none outline-none placeholder-textColor/50 text-[3.7vw] w-full"
                value={settings.name}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
              />
            </div>
            <div className="p-2 border-t border-t-textColor/20">
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="primary">Primary color</label>
                  <input
                    type="color"
                    name="primary"
                    id="primary"
                    className="cursor-pointer rounded-md"
                    value={settings.primary_color}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        primary_color: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <label htmlFor="secondary">Secondary color</label>
                  <input
                    type="color"
                    name="secondary"
                    id="secondary"
                    className="cursor-pointer rounded-md"
                    value={settings.secondary_color}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        secondary_color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-2">
                {color_themes.map((item) => {
                  return (
                    <button
                      type="button"
                      key={item.title}
                      className="h-7 w-10 flex cursor-pointer"
                      onClick={(e) =>
                        setSettings({
                          ...settings,
                          primary_color: item.primary,
                          secondary_color: item.secondary,
                        })
                      }
                    >
                      <span
                        className="flex-1 h-full"
                        style={{ backgroundColor: item.primary }}
                      ></span>
                      <span
                        className="flex-1 h-full"
                        style={{ backgroundColor: item.secondary }}
                      ></span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-2 border-t border-t-textColor/20 flex justify-between items-center">
              <label htmlFor="style">
                Font style ({isStyled ? "wisp" : "default"})
              </label>
              <Switch
                id="style"
                checked={isStyled}
                onCheckedChange={setIsStyled}
              />
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{loading ? <Loading/> : "Save changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default Settings;
