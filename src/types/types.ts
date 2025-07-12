import { Timestamp } from "firebase/firestore";
import React from "react";

export type User = {
  name: string | null;
  id: string;
  primary_color: string;
  secondary_color: string;
  style: "default" | "wisp";
  album: string[];
  created_at: Timestamp;
  updated_at: Timestamp | null;
};

export type Nav = {
  navLink: string;
  title: string;
  icon: React.ReactNode;
};

export type List = {
  id: string;
  text: string;
}

export type Todo = {
  id: string;
  text: string;
  user_id: string;
  created_at: Timestamp;
  updated_at: Timestamp | null;
}

export type Widget = {
  category:
    | "weather"
    | "date-time"
    | "album"
    | "misc"
    | "to-do"
    | "music-player";
  sub_category: string | null;
  title: string;
  preview: React.ComponentType<ComponentStyle>;
  is_primary: boolean;
  is_glassomorphic: boolean;
  widget: React.ComponentType<ComponentStyle>;
  serial_num: number;
  data?: { top_text: string; icon: number; temp: number}[] | null
};

export type ComponentStyle = {
  primaryColor?: string;
  secondaryColor?: string;
  is_primary?: boolean;
  is_glassomorphic?: boolean;
  index?: number;
  data?: { top_text: string; icon: number; temp: number}[]
};
