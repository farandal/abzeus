/// <reference types="vite/client" />
interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import('electron').IpcRenderer
    electron: import('electron')
    getWindowSize: () => ipcRenderer.send
    onWindowSize: (callback:any) => ipcRenderer.on
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    windowSize: () => [number,number]
  }

 