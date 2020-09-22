const { app, BrowserWindow, dialog } = require('electron');
const { ipcMain } = require('electron');
const { Messenger } = require('./tcp/messenger');
let messenger;
const { loadConfig } = require('./lib/loadConfig');

// Loading config
let config = {};
try {
  console.log("Loading config");
  config = loadConfig();
}
catch (e) {
  console.log(e);
  //dialog.showMessageBox({ type: 'error', message: "Config load error!", title: "GM Tool error" });
}

/* Login Logout */
ipcMain.on('logoutUser', (event, arg) => {
  if (!messenger) return;
  messenger.disconnect();
  messenger = null;
});

ipcMain.on('loginUser', (event, arg) => {
  messenger = new Messenger(arg.username, arg.password, arg.ip, arg.port);
  messenger.on('connect', () => {
    console.log("Conned");
    event.reply('connected');
  });

  messenger.on('data', (data) => {

  });

  messenger.on('servers', (data) => {
    config["servers"] = data;
  });

  messenger.on('error', (e) => {
    dialog.showMessageBox({ type: 'error', message: "Server error!", title: "GM Tool error" });
    event.reply('error');
  });

  messenger.on('authorityChange', () => {
    console.log("Authority changed", messenger.authority);
    event.reply('authorityChange', messenger.authority);
  });
});

// Teleport window
ipcMain.on('teleportUserToPos', (event, arg) => {
  if (!messenger) return;
  const { server, channel, map, x, y, z, charNames } = arg;
  const charNamesArray = charNames ? charNames.split("\n") : [];

  charNamesArray.forEach((charNameSplitted) => {
    if (!charNameSplitted) return;
    messenger.teleportPlayer(server, channel, map, x, y, z, charNameSplitted);
  });
});

// Teleport window
ipcMain.on('teleportUserToChar', (event, arg) => {
  if (!messenger) return;
  const { server, charNames, charNameTarget } = arg;
  const charNamesArray = charNames ? charNames.split("\n") : [];

  charNamesArray.forEach((charNameSplitted) => {
    if (!charNameSplitted) return;
    messenger.teleportPlayerToUser(server, charNameSplitted, charNameTarget);
  });
});

// Message window
ipcMain.on('messageUser', (event, arg) => {
  if (!messenger) return;
  const { usernames, message } = arg;
  const userNamesArray = usernames ? usernames.split("\n") : [];

  userNamesArray.forEach((userNameSplitted) => {
    if (!userNameSplitted) return;
    messenger.messagePlayer(userNameSplitted, message);
  });
});

// ChatBan window
ipcMain.on('chatBanUser', (event, arg) => {
  if (!messenger) return;
  const { usernames, time, reason } = arg;
  const userNamesArray = usernames ? usernames.split("\n") : [];

  userNamesArray.forEach((userNameSplitted) => {
    if (!userNameSplitted) return;
    messenger.chatBanPlayer(userNameSplitted, time, reason);
  });
});

// Kick window
ipcMain.on('kickUser', (event, arg) => {
  if (!messenger) return;
  const { usernames } = arg;
  const userNamesArray = usernames ? usernames.split("\n") : [];

  userNamesArray.forEach((userNameSplitted) => {
    if (!userNameSplitted) return;
    messenger.kickPlayer(userNameSplitted);
  });
});

// get config
ipcMain.on('getConfig', (event, arg) => {
  event.returnValue = config;
});

// Main button handlers
ipcMain.on('openTeleport', () => {
  createTeleportWindow();
});

ipcMain.on('openMessage', () => {
  createMessageWindow();
});

ipcMain.on('openKick', () => {
  createKickWindow();
});

ipcMain.on('openChatBan', () => {
  createChatBanWindow();
});

// Window functions
function createMainWindow() {
  console.log("color", config.backgroundColor);
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 425,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png',
    resizable: false,
    backgroundColor: config.backgroundColor,
    title: "GM Tool 2.1"
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
  //mainWindow.webContents.openDevTools();
}

function createTeleportWindow() {
  const teleportWindow = new BrowserWindow({
    width: 400,
    height: 530,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png',
    resizable: false,
    backgroundColor: config.backgroundColor,
    title: "Teleport - GM Tool 2.1"
  });
  teleportWindow.setMenu(null);
  teleportWindow.loadFile('teleport.html');
  //teleportWindow.openDevTools();
}

function createMessageWindow() {
  const messageWindow = new BrowserWindow({
    width: 400,
    height: 450,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png',
    resizable: false,
    backgroundColor: config.backgroundColor,
    title: "Message - GM Tool 2.1"
  });
  messageWindow.setMenu(null);
  messageWindow.loadFile('message.html');
  // messageWindow.webContents.openDevTools();
}

function createKickWindow() {
  const messageWindow = new BrowserWindow({
    width: 400,
    height: 275,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png',
    resizable: false,
    backgroundColor: config.backgroundColor,
    title: "Kick - GM Tool 2.1"
  });
  messageWindow.setMenu(null);
  messageWindow.loadFile('kick.html')
  // messageWindow.webContents.openDevTools();
}

function createChatBanWindow() {
  const chatBanWindow = new BrowserWindow({
    width: 400,
    height: 350,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png',
    resizable: false,
    backgroundColor: config.backgroundColor,
    title: "ChatBan - GM Tool 2.1"
  });
  chatBanWindow.setMenu(null);
  chatBanWindow.loadFile('chatBan.html')
  // chatBanWindow.webContents.openDevTools();
}

app.whenReady().then(createMainWindow)