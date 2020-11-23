const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote

const button = document.getElementsByTagName('button')
const input = document.getElementById('url')

input.addEventListener('paste', (event) => {
    event.stopPropagation();
    let inputValue = (event.clipboardData || window.clipboardData).getData('text')
    let URL = matchYoutubeUrl(inputValue)
    if (!URL) {
        document.getElementById('title').innerHTML = 'URL invávlida'
    } else {
        ipcRenderer.send('video:info', URL)
    }
})

// Recebe a informações do video
ipcRenderer.on('video:info', (event, info) => {

    document.getElementById('title').innerHTML = info.title
    document.getElementById('size').innerHTML = `${Math.ceil(info.filesize / 1024 / 1024).toFixed(2)}MB`
    document.getElementById('time').innerHTML = info._duration_hms
    document.querySelector('img').src = info.thumbnail
})

function matchYoutubeUrl(url) {
    let regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(regex)){
        return url.match(regex)[1];
    }
    return false;
}
// MP3
button[0].addEventListener('click', (event) => {
    event.preventDefault()
    downloadStarted()
    ipcRenderer.send('video:download', input.value, 'mp3')
}) 

// MP4
button[1].addEventListener('click', (event) => {
    event.preventDefault()
    downloadStarted()
    ipcRenderer.send('video:download', input.value, 'mp4')
}) 

ipcRenderer.on('video:download', (event, message) => {
    console.log('Entrou')
    const options = {
        type: 'info',
        title: 'Downloaded',
        message: message,
    }
    let response = dialog.showMessageBox(null, options)
    console.log(response)
})

function downloadStarted() {
    const options = {
        type: 'info',
        title: 'Download',
        message: 'Download started'
    }
    dialog.showMessageBox(null, options, (response) => {
        console.log(response)
    })
}





