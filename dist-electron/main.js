import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Auto-reload in development environment
if (process.env.NODE_ENV === 'development') {
    (async () => {
        const electronReload = await import('electron-reload');
        electronReload.default(path.join(__dirname, '..'), {
            electron: require.resolve('electron'),
        });
    })();
}
const isDev = !app.isPackaged;
const widgetWindows = {};
function createWindow(name = 'main', urlPath = '') {
    if (widgetWindows[name]) {
        widgetWindows[name].show();
        return;
    }
    const win = new BrowserWindow({
        maxHeight: 700,
        minHeight: 700,
        height: 700,
        minWidth: 400,
        maxWidth: 400,
        width: 400,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    if (isDev) {
        win.loadURL(`http://localhost:5173/${urlPath}`);
    }
    else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    widgetWindows[name] = win;
    win.on('closed', () => {
        delete widgetWindows[name];
    });
}
app.whenReady().then(() => {
    createWindow();
    ipcMain.on('open-widget', (_event, name, urlPath) => {
        createWindow(name, urlPath);
    });
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
