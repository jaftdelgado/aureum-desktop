// electron/main.cjs
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL; // la ponemos desde npm script
const isDev = !!VITE_DEV_SERVER_URL;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev && VITE_DEV_SERVER_URL) {
    // 👇 DESARROLLO: usar Vite (aquí ya ves el login como en el navegador)
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // 👇 PRODUCCIÓN: usar el build de Vite
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
