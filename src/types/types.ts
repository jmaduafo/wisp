export type WeatherProps = {};

export type User = {
  name: string;
  id: string;
  primary_color: string;
  secondary_color: string;
  is_celsius: boolean;
  is_24hr: boolean;
  created_at: string;
  updated_at: string | null;
};

export type Nav = {
  navLink: string;
  title: string;
  icon: React.ReactNode
};
