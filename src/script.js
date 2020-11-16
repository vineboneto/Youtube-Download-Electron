const { ipcRenderer } = require('electron')


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const { value } = document.querySelector('input')
    ipcRenderer.send('window:url', value)
})

ipcRenderer.on('window:replay', (event, arg) => {
    console.log(arg)
})