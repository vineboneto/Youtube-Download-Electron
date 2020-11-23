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
        webPreferences: { enableRemoteModule: true, backgryyoundThrottling: false, nodeIntegration: true }
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
    mainWindow.on('closed', () => { mainWindow = null })

    createMenu()
})


// Download video
ipcMain.on('video:download', (event, url, format) => {
    let dir = './downloads'
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, (err) => { 
            if (err) return console.error(err); 
        })
    }
    // Select mp3 or mp4
    const video = format == 'mp3' ? youtubedl(url, ['-x', '--audio-format', 'mp3'], { cwd: __dirname })
    : youtubedl(url, [], { cwd: __dirname })

    // Download video
    youtubedl.getInfo(url, [] , (err, info) => {
        if (err) throw err
        try {
            let title = info.title.replace(/"([^"]+(?="))"/g, '$1')
            video.pipe(fs.createWriteStream(`./downloads/${title}.${format}`))

        }
        catch(e) { console.error('Failed to save the file') }   
    })

    video.on('end', () => {
        const message = `open: ${__dirname}\\downloads`
        event.reply('video:download', message) 
    })

})


ipcMain.on('video:info', (event, url) => {
    youtubedl.getInfo(url, [], (err, info) => {
        if (err) throw err
        const objInf = {
            title: info.title,
            filesize: info.filesize,
            _duration_hms: info._duration_hms,
            thumbnail: info.thumbnail 
        }
        // Envia as informaçoes do video para scrips.js
        event.reply('video:info', objInf)
    })
})





