const { Menu } = require('electron')

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

// MacOS: Remove a primeira opção do menu
if (process.platform === 'darwin') { 
    menuTemplate.unshift({})
}

// Se não estiver em produçao exibe opções de desenvolvedor na menu
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            { role: 'reload' },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'f12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        ]
    })
}

module.exports = function createMenu() {
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
}








