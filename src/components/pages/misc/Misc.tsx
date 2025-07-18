import MenuDisplay from "@/components/ui/menu/MenuDisplay";
import { Nav } from "@/types/types";
import {
  Calculator,
  Gamepad2,
  CalendarDays,
  Hourglass,
  MessageCircleQuestion,
  Quote,
} from "lucide-react";
import React from "react";

function Misc() {
  const misc: Nav[] = [
    {
      title: "Mini game",
      navLink: "misc/game",
      icon: <Gamepad2 className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Calculator",
      navLink: "misc/calculator",
      icon: <Calculator className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Calendar",
      navLink: "misc/calendar",
      icon: <CalendarDays className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Timer",
      navLink: "misc/timer",
      icon: <Hourglass className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Quote",
      navLink: "misc/quote",
      icon: <Quote className="w-7 h-7" strokeWidth={1} />,
    },
    {
      title: "Daily quiz",
      navLink: "misc/quiz",
      icon: <MessageCircleQuestion className="w-7 h-7" strokeWidth={1} />,
    },
  ];

  return <MenuDisplay array={misc} title="Misc" />;
}

export default Misc;
