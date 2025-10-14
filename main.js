const { app, BrowserWindow, Menu } = require("electron");

// Set env
process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

function createMainWindow() {
  let mainWindow = new BrowserWindow({
    width: isDev ? 1200 : 1000,
    height: 600,
    title: "StatCode",
    icon: `${__dirname}/assets/StatCode.png`,
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile("./app/index.html");
}


function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
    title: "About StatCode",
    icon: `${__dirname}/assets/StatCode.png`,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
  });

  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "App",
    submenu: [
      {
        label: "About",
        click: () => createAboutWindow(),
      },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
