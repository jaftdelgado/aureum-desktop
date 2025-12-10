const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");
require("dotenv").config();

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const PROD_URL = process.env.VITE_PROD_URL || "https://aureum-desktop.vercel.app";
const isDev = !!VITE_DEV_SERVER_URL;

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("aureum", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("aureum");
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-maximized", true);
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-maximized", false);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  if (isDev && VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(PROD_URL);
  }

  return mainWindow;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();

      const url = commandLine.find((arg) => arg.startsWith("aureum://"));
      if (url) {
        handleOpenUrl(url);
      }
    }
  });

  app.whenReady().then(() => {
    createWindow();

    ipcMain.on("window-action", (event, action) => {
      const senderWin = BrowserWindow.fromWebContents(event.sender);
      if (!senderWin) return;

      switch (action) {
        case "minimize":
          senderWin.minimize();
          break;
        case "maximize":
          senderWin.isMaximized()
            ? senderWin.unmaximize()
            : senderWin.maximize();
          break;
        case "close":
          senderWin.close();
          break;
      }
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("open-url", (event, url) => {
    event.preventDefault();
    handleOpenUrl(url);
  });
}

function handleOpenUrl(url) {
  console.log("Deep link recibido:", url);
  if (mainWindow) {
    mainWindow.webContents.send("supabase-auth-token", url);
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
