// electron/main.cjs
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const isDev = !!VITE_DEV_SERVER_URL;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // <- ventana sin marco para crear titlebar personalizada
    titleBarStyle: "hidden", // macOS
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Forward events to renderer so el TitleBar puede actualizar iconos
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-maximized", true);
  });
  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-maximized", false);
  });

  if (isDev && VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const win = createWindow();

  // IPC: acciones desde renderer
  ipcMain.on("window-action", (event, action) => {
    const senderWin = BrowserWindow.fromWebContents(event.sender);
    if (!senderWin) return;

    switch (action) {
      case "minimize":
        senderWin.minimize();
        break;
      case "maximize":
        if (senderWin.isMaximized()) senderWin.unmaximize();
        else senderWin.maximize();
        break;
      case "close":
        senderWin.close();
        break;
      default:
        break;
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
