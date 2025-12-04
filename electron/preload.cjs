// electron/preload.cjs

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  windowAction: (action) => ipcRenderer.send("window-action", action),
});
