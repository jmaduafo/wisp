const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => "pong",
  minimize: () => ipcRenderer.send("window:minimize"),
  close: () => ipcRenderer.send("window:close"),
  openWidget: (name: string, urlPath: string) => {
    ipcRenderer.send("open-widget", name, urlPath);
  },
  // getLocation: async () => {
  //   const res = await fetch("https://ipapi.co/json/");
  //   const data: any = await res.json();
  //   return {
  //     latitude: data.latitude,
  //     longitude: data.longitude,
  //     city: data.city,
  //   };
  // },
});
