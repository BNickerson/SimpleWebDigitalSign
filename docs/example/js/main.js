import {Sign} from './slideshow.js'

document.addEventListener('DOMContentLoaded', async function() {
    let slides = [
        {
            media: 'https://www.setaswall.com/wp-content/uploads/2017/10/Vermillion-Lake-Stars-Qhd-Wallpaper-1080x1920.jpg',
            type: 'image',
            transition: 'flipInX' // optional
        },
        {
            media: 'https://wallpaperplay.com/walls/full/0/6/3/13650.jpg',
            type: 'image',
            transition: 'rotateInDownRight' // optional
        }
    ]

    let sign = new Sign('digital-sign', {transition: 'rollIn', slides: slides})
    sign.start()
})
