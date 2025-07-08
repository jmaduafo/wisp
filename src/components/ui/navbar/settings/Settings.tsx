import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
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
import { User } from "@/types/types";
import { Switch } from "../../switch";
import { color_themes } from "@/utils/data";
import { toast } from "sonner";

function Settings({ user }: { readonly user: User | undefined }) {
  const [isStyled, setIsStyled] = useState(false);

  const [settings, setSettings] = useState({
    name: "",
    primary_color: "",
    secondary_color: "",
  });
  // Change name
  // Change background color
  // Change text color
  // Change font family (default or elegant)
  //

  const updateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!settings.name.length) {
      toast("Something went wrong", {
        description: "Please enter your name",
      });
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default Settings;
