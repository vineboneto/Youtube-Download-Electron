const { ipcMain, app, BrowserWindow, Menu } = require('electron')

let mainWindow

// Cria Janela
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        width: 600,
        webPreferences: { backgryyoundThrottling: false, nodeIntegration: true }
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
    mainWindow.on('closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl + Q',
                click() { app.quit() }
            }
        ]
    }
]

if (process.platform === 'darwin') { // MacOS
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            { role: 'reload' },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        ]
    })
}

const fs = require('fs')
const youtubedl = require('youtube-dl')


// Download video
ipcMain.on('window:url', (event, url) => {
    const video = youtubedl(url, ['--format=18'], { cwd: __dirname } )
    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
    })
    video.pipe(fs.createWriteStream('myvideo.mp4'))      
    event.reply('window:replay', url)
})



