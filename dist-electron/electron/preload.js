"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("api", {
    ping: () => 'pong',
    minimize: () => ipcRenderer.send('window:minimize'),
    close: () => ipcRenderer.send('window:close'),
    openWidget: (name, urlPath) => {
        ipcRenderer.send('open-widget', name, urlPath);
    }
});
