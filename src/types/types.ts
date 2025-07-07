export type WeatherProps = {};

export type User = {
  name: string | null;
  id: string;
  primary_color: string | null;
  secondary_color: string | null;
  style: "default" | "wisp";
  created_at: string;
  updated_at: string | null;
};

export type Nav = {
  navLink: string;
  title: string;
  icon: React.ReactNode;
};

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
