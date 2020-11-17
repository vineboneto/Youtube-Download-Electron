const { app, ipcMain, BrowserWindow } = require('electron')
const createMenu = require('./src/electron/menu.js')

let mainWindow

// Cria Janela Electron
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 700,
        webPreferences: { backgryyoundThrottling: false, nodeIntegration: true }
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
    mainWindow.on('closed', () => { mainWindow = null })

    createMenu()
})

// Download video
ipcMain.on('download:url', (event, url) => {
    console.log('Executando')
})




