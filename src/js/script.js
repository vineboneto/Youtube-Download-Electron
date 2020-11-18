const { ipcRenderer } = require('electron')

const button = document.getElementsByTagName('button')

// MP3
button[0].addEventListener('click', (event) => {
    event.preventDefault()
    // Pegar valor de input
    const { value } = document.querySelector('input')
    ipcRenderer.send('video:url', value, 'mp3')
}) 

// MP4
button[1].addEventListener('click', (event) => {
    event.preventDefault()
    // Pegar valor de input
    const { value } = document.querySelector('input')
    ipcRenderer.send('video:url', value, 'mp4')
}) 

// Recebe a informações do video
ipcRenderer.on('video:info', (event, info) => {
    console.log('filename: ' + info._filename)
    // Convert to Bytes for Megabytes
    console.log('size: ' + Math.ceil(info.size / 1024 / 1024))
    
})

