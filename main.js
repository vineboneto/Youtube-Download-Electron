const { app, ipcMain, BrowserWindow } = require('electron')
const createMenu = require('./src/electron/menu.js')
const youtubedl = require('youtube-dl')
const fs = require('fs')
const readline = require('readline');
const path = require('path');

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
        if (err) throw err
        video.pipe(fs.createWriteStream(`${info.title}.${format}`)) 
    })
})

ipcMain.on('video:info', (event, url) => {

    console.log('Entoru em video:info')
    youtubedl.getInfo(url, [], (err, info) => {
        console.log('Entoru em getInfo()')
        if (err) throw err
        console.log('filename: ' + info.title)
        console.log('duration: ' + info.duration)
        console.log('size: ' + Math.ceil(info.size / 1024 / 1024).toFixed(2))
        console.log('duration_hms: ' + info._duration_hms)
        console.log('duration_raw: ' + Math.ceil(info._duration_raw / 1024 / 1024).toFixed(2))
        // Envia as informaçoes do video para scrips.js
        event.reply('video:info', info)
    })
})





