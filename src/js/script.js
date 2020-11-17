const { ipcRenderer } = require('electron')

const button = document.getElementsByTagName('button')

// MP3
button[0].addEventListener('click', (event) => {
    event.preventDefault()
    // Pegar valor de input
    const { value } = document.querySelector('input')
    ipcRenderer.send('download:url', value, 'mp3')
}) 

// MP4
button[1].addEventListener('click', (event) => {
    event.preventDefault()
    // Pegar valor de input
    const { value } = document.querySelector('input')
    ipcRenderer.send('download:url', value, 'mp4')
}) 

// Recebe a informação processar em ipcMain
ipcRenderer.on('download:replay', (event, arg) => {
    console.log(arg)
})

