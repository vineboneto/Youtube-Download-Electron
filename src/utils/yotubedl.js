const fs = require('fs')
const youtubedl = require('youtube-dl')

const video = youtubedl(url, ['--format=18'], { cwd: __dirname } )
video.on('info', function(info) {
    console.log('Download started')
    console.log('filename: ' + info._filename)
    console.log('size: ' + info.size)
})
// video.pipe(fs.createWriteStream('myvideo.mp4'))      
event.reply('window:replay', url)