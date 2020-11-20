const { ipcRenderer } = require('electron')

const button = document.getElementsByTagName('button')
const input = document.getElementById('url')
const span = document.getElementsByTagName('span')

input.addEventListener('paste', (event) => {
    event.stopPropagation();
    let inputValue = (event.clipboardData || window.clipboardData).getData('text')
    let URL = matchYoutubeUrl(inputValue)
    if (!URL) {
        console.log('URL INVALIDA')
    } else {
        ipcRenderer.send('video:info', URL)
    }

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
    // Pegar valor de input
    ipcRenderer.send('video:url', input.value, 'mp3')
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
    console.log('filename: ' + info._filename)
    console.log('duration: ' + info.duration)
    console.log('size: ' + Math.ceil(info.size / 1024 / 1024).toFixed(2))
    console.log('duration_hms: ' + info._duration_hms)
    console.log('duration_raw: ' + Math.ceil(info._duration_raw / 1024 / 1024).toFixed(2))
})

