"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
    ping: () => 'pong',
    // openWidget: (name, urlPath) => ipcRenderer.send("open-widget", name, urlPath),
});
