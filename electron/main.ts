import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround in ESM
const __filename: string = fileURLToPath(import.meta.url);
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
const widgetWindows: Record<string, BrowserWindow> = {};

function createWindow(name = "main", urlPath = "") {
  if (widgetWindows[name]) {
    widgetWindows[name].show();
    return;
  }

  const win = new BrowserWindow({
    maxHeight: urlPath === "" ? 700 : undefined,
    minHeight: urlPath === "" ? 700 : 200,
    height: urlPath === "" ? 700 : 200,
    minWidth: urlPath === "" ? 400 : 300,
    maxWidth: urlPath === "" ? 400 : 1000,
    width: urlPath === "" ? 400 : 300,
    frame: false,
    resizable: true,
    transparent: true, // On macOS, can be acrylic-like
    backgroundColor: "#00000000",
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: true,
      experimentalFeatures: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.removeMenu();

  if (isDev) {
    win.loadURL(`http://localhost:5173/${urlPath}`);
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

  ipcMain.on("open-widget", (_event, name: string, urlPath: string) => {
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

ipcMain.on("open-widget", (_event, name: string, urlPath: string) => {
  createWindow(name, urlPath);
});
