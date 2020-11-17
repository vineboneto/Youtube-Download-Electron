const { app, ipcMain, BrowserWindow } = require('electron')
const createMenu = require('./src/electron/menu.js')
const youtubedl = require('youtube-dl')
const fs = require('fs')

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
ipcMain.on('download:url', (event, url, format) => {
    // Download in mp3 or mp4
    const download =  format == 'mp3' ? youtubedl(url, ['-x', '--audio-format', 'mp3'], { __dirname })
    : youtubedl(url, ['--format=18'], { __dirname })
   

    download.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
        console.log('size: ' + info._duration_raw)
        console.log('size: ' + info._duration_raw)
    })
    download.pipe(fs.createWriteStream(`download.${format}`)) 
})




