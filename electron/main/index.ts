import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { update } from './update'
import * as dotenv from 'dotenv'
import * as path from 'path';


function getFilePathAndFileName(fileString:string) {
  const pathParts = fileString.split(path.sep);
  const fileNameWithExtension = pathParts.pop();
  const filePath = path.join(...pathParts);
  return { filePath, fileNameWithExtension };
}


dotenv.config()

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = dirname(__filename)

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//

//const PYTHON:string=process.env.PYTHON || ""
//const PYTHON_SCRIPT:string=process.env.PYTHON_SCRIPT || ""

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

//let win: BrowserWindow | null = null
let win: BrowserWindow 
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
console.log(process.env.DIST);
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'ABZ*us',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
     
       
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

    win.on('resize', () => {
        const [ width, height ] = win.getSize();
        win.webContents.send('window-size', [width,height]);
    });


  if (url) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
    //win.loadURL(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())   
        const [ width, height ] = win.getSize();
        win.webContents.send('window-size', [width,height]);

  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  
  //const scriptDirectory = path.dirname(path.normalize(PYTHON_SCRIPT));
  console.log(process.platform)
  
  if (process.platform === 'win32') {
//    console.log("Spawning Python subprocess")
//    console.log(PYTHON,PYTHON_SCRIPT)
//    const pythonProcess = spawn(PYTHON, [PYTHON_SCRIPT],{
//        cwd: scriptDirectory,
//        //stdio: 'inherit'
//      });
//
//      
//      /* @ts-ignore */   
//      pythonProcess.stdout.on('data', (data) => {
//        console.error(`Python process output: ${data.toString()}`);
//        ipcMain.emit('python-output', 'data:'+data.toString());
//      });
//      /* @ts-ignore */
//      pythonProcess.stderr.on('data', (data) => {
//        console.error(`Python process stderr: ${data.toString()}`);
//        ipcMain.emit('python-output', 'error:'+data.toString());
//      });
//      /* @ts-ignore */
//      pythonProcess.on('close', (code) => {
//        console.log(`Python process exited with code ${code}`);
//        ipcMain.emit('python-output', 'close:'+code);
//      });
//  } else if (process.platform === 'darwin') {
//    console.log('The app is running on macOS.');
//  } else {
//    console.log('The app is running on a different platform.');
 }
  

  // Apply electron-updater
  update(win)
}

app.whenReady().then(createWindow)



app.on('window-all-closed', () => {
  //win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    icon: path.join(__dirname, 'public/icons/abzeus.ico'),
 
    //win32icon: path.join(__dirname, 'path/to/icon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false

    },
  })


  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
/*
ipcMain.on('run-python-script', (event, pythonPath, script,args) => {
  
  console.log("ipcMain.on run-python-script", pythonPath, script,args)
  
  const { filePath, fileNameWithExtension } = getFilePathAndFileName(script);


  const options:Options = {
    mode: 'text',
    pythonPath: pythonPath,
    scriptPath: filePath,
    pythonOptions: ['-u'],
    args,
  };

  console.log(options)
  if(fileNameWithExtension) {
    const pyshell = new PythonShell(fileNameWithExtension,options);

    pyshell.on('message', (message) => {
      win.webContents.send('python-output', message);
    });

    pyshell.on('error', (err) => {
      console.error(err);
    });
  } else {
    console.error("No filename was provided to python script")
  }

});
*/