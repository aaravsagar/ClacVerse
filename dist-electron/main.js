import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow = null;
let hideWhenNotFocused = false;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    icon: path.join(__dirname, "../public/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  Menu.setApplicationMenu(null);
  ipcMain.on("toggle-hide-on-blur", (event, shouldHide) => {
    hideWhenNotFocused = shouldHide;
    console.log("Hide on blur setting changed:", hideWhenNotFocused);
  });
  mainWindow.on("blur", () => {
    if (hideWhenNotFocused && mainWindow) {
      mainWindow.setBounds({ x: -1e4, y: -1e4 });
    }
  });
  mainWindow.on("focus", () => {
    if (mainWindow) {
      mainWindow.setBounds({ x: 100, y: 100, width: 800, height: 600 });
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
