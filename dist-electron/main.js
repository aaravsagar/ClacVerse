import { app as n, BrowserWindow as s, Menu as d, ipcMain as r } from "electron";
import i from "path";
import { fileURLToPath as c } from "url";
const t = i.dirname(c(import.meta.url));
let e = null, o = !1;
function l() {
  e = new s({
    width: 800,
    height: 600,
    resizable: !1,
    fullscreen: !1,
    icon: i.join(t, "../public/icon.png"),
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), process.env.NODE_ENV === "development" ? e.loadURL("http://localhost:5173") : e.loadFile(i.join(t, "../dist/index.html")), d.setApplicationMenu(null), r.on("toggle-hide-on-blur", (f, a) => {
    o = a, console.log("Hide on blur setting changed:", o);
  }), e.on("blur", () => {
    o && e && e.setBounds({ x: -1e4, y: -1e4 });
  }), e.on("focus", () => {
    e && e.setBounds({ x: 100, y: 100, width: 800, height: 600 });
  }), e.on("closed", () => {
    e = null;
  });
}
n.whenReady().then(() => {
  l(), n.on("activate", () => {
    s.getAllWindows().length === 0 && l();
  });
});
n.on("window-all-closed", () => {
  process.platform !== "darwin" && n.quit();
});
