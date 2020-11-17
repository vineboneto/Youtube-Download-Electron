const { ipcRenderer } = require('electron')

// Selecion a tag form
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    // Captura o valor de input
    const { value } = document.querySelector('input')


    //Envia para ipcMain main o evento 'download:url' e o valor de input
    ipcRenderer.send('download:url', value, format)
})


// Recebe a informação processar em ipcMain
ipcRenderer.on('download:replay', (event, arg) => {
    console.log(arg)
})