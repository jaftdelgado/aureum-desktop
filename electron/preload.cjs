const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  windowAction: (action) => ipcRenderer.send("window-action", action),

  onAuthToken: (callback) => {
    const handler = (_event, url) => callback(url);
    
    ipcRenderer.on("supabase-auth-token", handler);
    
    return () => ipcRenderer.removeListener("supabase-auth-token", handler);
  },
});
