export {};

declare global {
  interface Window {
    api: {
      minimize: () => void;
      close: () => void;
      openWidget: (name: string, urlPath: string) => void;
      getLocation: () => { latitude: string; longitude: string; city: string}
    };
  }
}