const { app, ipcMain, BrowserWindow } = require('electron')
const createMenu = require('./src/electron/menu.js')
const youtubedl = require('youtube-dl')
const fs = require('fs')

let mainWindow

// Cria Janela Electron
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 700,
        webPreferences: { backgryyoundThrottling: false, nodeIntegration: true }
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
    mainWindow.on('closed', () => { mainWindow = null })

    createMenu()
})


// Download video
ipcMain.on('video:url', (event, url, format) => {

    // Select mp3 or mp4
    const video = format == 'mp3' ? youtubedl(url, ['-x', '--audio-format', 'mp3'], { __dirname })
    : youtubedl(url, [], { cwd: __dirname })

    // Download video
    youtubedl.getInfo(url, [], (err, info) => {
        video.pipe(fs.createWriteStream(`${info.title}.${format}`)) 
    })

    video.on('info', (info) => {
        console.log('filename: ' + info._filename)
        console.log('duration: ' + info.duration)
        console.log('size: ' + Math.ceil(info.size / 1024 / 1024))
        console.log('duration_hms: ' + info._duration_hms)
        console.log('duration_raw: ' + Math.ceil(info._duration_raw / 1024 / 1024))
        // Envia as informaçoes do video para scrips.js
        event.reply('video:info', info)
    })



    
    
})





