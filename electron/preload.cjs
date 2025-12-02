const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // ej: sayHello: () => console.log('Hello from Electron!')
});
