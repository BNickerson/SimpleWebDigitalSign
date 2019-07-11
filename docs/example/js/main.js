import {Sign} from './slideshow.js'

document.addEventListener('DOMContentLoaded', async function() {
    let slides = [
        {
            media: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
            type: 'video',
            transition: 'flipInX' // optional
        },
        {
            media: 'http://www.exit109.com/~dnn/clips/RW20seconds_2.mp4',
            type: 'video',
            transition: 'rotateInDownRight' // optional
        }
    ]

    let sign = new Sign('digital-sign', {transition: 'rollIn', slides: slides})
    sign.start()
})