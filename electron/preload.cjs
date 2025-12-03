const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onAuthToken: (callback) => {
    ipcRenderer.on("supabase-auth-token", (_event, url) => callback(url));
  },
});