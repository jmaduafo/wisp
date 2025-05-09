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
  icon: React.ReactNode
};

export type ComponentStyle = {
    primaryColor?: string;
    secondaryColor?: string;
    is_primary?: boolean;
    is_glassomorphic?: boolean;
    index?: number;
}