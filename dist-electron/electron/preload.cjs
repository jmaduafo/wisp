"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require("electron");
const fetch = require("node-fetch");
contextBridge.exposeInMainWorld("api", {
    ping: () => "pong",
    minimize: () => ipcRenderer.send("window:minimize"),
    close: () => ipcRenderer.send("window:close"),
    openWidget: (name, urlPath) => {
        ipcRenderer.send("open-widget", name, urlPath);
    },
    getLocation: async () => {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city,
        };
    },
});
