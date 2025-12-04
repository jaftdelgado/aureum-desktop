const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  windowAction: (action) => ipcRenderer.send("window-action", action),

  onAuthToken: (callback) => {
    ipcRenderer.on("supabase-auth-token", (_event, url) => callback(url));
  },
});
