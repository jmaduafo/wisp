import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
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

function measurements(name, path) {
  if (name === "maxHeight") {
    if (path === "") {
      return 700;
    } else if (path === "weather") {
      return 300;
    } else if (path === "date-time") {
      return 300;
    } else if (path === "music-player") {
      return 300;
    } else if (path === "to-do") {
      return 400;
    } else if (path === "album") {
      return 300;
    } else if (path === "misc/game") {
      return 350;
    } else if (path === "misc/calculator") {
      return 400;
    } else if (path === "misc/timer") {
      return 400;
    } else if (path === "misc/calendar") {
      return 300;
    } else if (path === "misc/quote") {
      return 200;
    } else if (path === "misc/quiz") {
      return 300;
    }
  } else if (name === "minHeight" || name === "height") {
    if (path === "") {
      return 700;
    } else if (path === "weather") {
      return 250;
    } else if (path === "date-time") {
      return 230;
    } else if (path === "music-player") {
      return 230;
    } else if (path === "to-do") {
      return 300;
    } else if (path === "album") {
      return 150;
    } else if (path === "misc/game") {
      return 300;
    } else if (path === "misc/calculator") {
      return 330;
    } else if (path === "misc/timer") {
      return 330;
    } else if (path === "misc/calendar") {
      return 280;
    } else if (path === "misc/quote") {
      return 150;
    } else if (path === "misc/quiz") {
      return 250;
    }
  } else if (name === "maxWidth") {
    if (path === "") {
      return 400;
    } else if (path === "weather") {
      return 350;
    } else if (path === "date-time") {
      return 350;
    } else if (path === "music-player") {
      return 350;
    } else if (path === "to-do") {
      return 300;
    } else if (path === "album") {
      return 300;
    } else if (path === "misc/game") {
      return 350;
    } else if (path === "misc/calculator") {
      return 300;
    } else if (path === "misc/timer") {
      return 300;
    } else if (path === "misc/calendar") {
      return 325;
    } else if (path === "misc/quote") {
      return 325;
    } else if (path === "misc/quiz") {
      return 325;
    }
  } else if (name === "minWidth" || name === "width") {
    if (path === "") {
      return 400;
    } else if (path === "weather") {
      return 300;
    } else if (path === "date-time") {
      return 300;
    } else if (path === "music-player") {
      return 300;
    } else if (path === "to-do") {
      return 250;
    } else if (path === "album") {
      return 150;
    } else if (path === "misc/game") {
      return 270;
    } else if (path === "misc/calculator") {
      return 250;
    } else if (path === "misc/timer") {
      return 250;
    } else if (path === "misc/calendar") {
      return 250;
    } else if (path === "misc/quote") {
      return 270;
    } else if (path === "misc/quiz") {
      return 270;
    }
  }
}

function createWindow(name = "main", urlPath = "") {
  if (widgetWindows[name]) {
    widgetWindows[name].show();
    return;
  }
  const win = new BrowserWindow({
    maxHeight: measurements("maxHeight", urlPath),
    minHeight: measurements("minHeight", urlPath),
    height: measurements("height", urlPath),
    maxWidth: measurements("maxWidth", urlPath),
    minWidth: measurements("minWidth", urlPath),
    width: measurements("width", urlPath),
    // frame: false,
    resizable: true,
    // transparent: true,
    titleBarStyle: "hidden",
    // backgroundColor: "#00000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setMenuBarVisibility(false);
  win.removeMenu();

  if (isDev) {
    win.loadURL(`http://localhost:5173/${urlPath}`);
    // win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
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
