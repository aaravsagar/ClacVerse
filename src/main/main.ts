import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;
let hideWhenNotFocused: boolean = false; // Default setting

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    icon: path.join(__dirname, '../public/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  Menu.setApplicationMenu(null);

  // Listen to IPC for the hide-on-blur setting
  ipcMain.on('toggle-hide-on-blur', (event, shouldHide: boolean) => {
    hideWhenNotFocused = shouldHide;
    console.log('Hide on blur setting changed:', hideWhenNotFocused);
  });

  // Listen to window focus/blur events
  mainWindow.on('blur', () => {
    if (hideWhenNotFocused && mainWindow) {
      mainWindow.setBounds({ x: -10000, y: -10000 }); // Move window off-screen (behind other windows)
    }
  });

  mainWindow.on('focus', () => {
    if (mainWindow) {
      mainWindow.setBounds({ x: 100, y: 100, width: 800, height: 600 }); // Restore window to its original position
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  // Recreate window when app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
