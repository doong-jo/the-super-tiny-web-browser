const { browse } = require('./network.js');
const { app, ipcMain, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

let win;

function loadURL() {
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
}

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    loadURL();

    win.webContents.openDevTools();
}

ipcMain.on('urlRequest', (e, url) => {
    console.log('ipcMain on urlRequest', url);
    try{
        browse(url, loadURL);
    } catch(e) {
        console.log(e.message);
    }
});

app.on('ready', createWindow);
