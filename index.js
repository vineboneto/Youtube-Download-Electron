const { ipcMain, ipcRenderer, app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        width: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})