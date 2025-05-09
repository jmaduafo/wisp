export type WeatherProps = {};

export type User = {
  name: string | null;
  id: string;
  primary_color: string | null;
  secondary_color: string | null;
  is_celsius: boolean;
  is_24hr: boolean;
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
  demo: React.ReactNode;
  is_primary: boolean;
  is_glassomorphic: boolean;
  widget: React.ReactNode;
  serial_num: number;
};

export type ComponentStyle = {
  primaryColor?: string;
  secondaryColor?: string;
  is_primary?: boolean;
  is_glassomorphic?: boolean;
  index?: number;
};
