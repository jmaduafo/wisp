import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Auto-reload in development environment
if (process.env.NODE_ENV === "development") {
  (async () => {
    const electronReload = await import("electron-reload");
    electronReload.default(path.join(__dirname, ".."), {
      electron: require.resolve("electron"),
    });
  })();
}
const isDev = !app.isPackaged;
const widgetWindows = {};
function createWindow(name = "main", urlPath = "") {
  if (widgetWindows[name]) {
    widgetWindows[name].show();
    return;
  }
  const win = new BrowserWindow({
    maxHeight: urlPath === "" ? 700 : 300,
    minHeight: urlPath === "" ? 700 : 250,
    height: urlPath === "" ? 700 : 250,
    maxWidth: urlPath === "" ? 400 : 350,
    minWidth: urlPath === "" ? 400 : 300,
    width: urlPath === "" ? 400 : 300,
    // frame: false,
    resizable: true,
    // transparent: true,
    titleBarStyle: "hidden",
    // backgroundColor: "#00000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  win.setMenuBarVisibility(false);
  win.removeMenu();

  if (isDev) {
    win.loadURL(`http://localhost:5173/${urlPath}`);
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }

  widgetWindows[name] = win;

  win.on("closed", () => {
    delete widgetWindows[name];
  });
}
app.whenReady().then(() => {
  createWindow();
  ipcMain.on("open-widget", (_event, name, urlPath) => {
    createWindow(name, urlPath);
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
ipcMain.on("window:minimize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});
ipcMain.on("window:close", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});
