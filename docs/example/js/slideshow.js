export class Sign {
    constructor(elementId, options) {
        this.signElement = elementId;
        this.slideElements = [];
        this.options = {};

        options.hasOwnProperty('transition') ? this.options.transition = options.transition : this.options.transition = 'fadeIn';
        options.hasOwnProperty('slides') ? this.options.slides = options.slides.map(a => Object.assign({}, a)) : this.options.slides = []; // use Object.assign to deep copy each object in the array

        this.currentSlide = 0; // set it to the last slide, so that start() doesn't skip the first sign

        document.getElementById(this.signElement).classList.add('signage-wrapper');

        this.options.slides.forEach((slide, index) => {
            let newSlide = document.createElement('div');
            newSlide.classList.add('sign', `${this.signElement}${index}`);

            if(slide.type == 'image') {
                let slideMedia = document.createElement('img');
                slideMedia.src = slide.media;
                newSlide.appendChild(slideMedia);
            } else if (slide.type == 'video') {
                let slideMedia = document.createElement('video');
                slideMedia.setAttribute('muted', 'muted');
                let source = document.createElement('source');
                source.src = slide.media;
                source.type = `video/${slide.media.split('.').pop()}`;
                slideMedia.appendChild(source);
                newSlide.appendChild(slideMedia);
            } else {
                console.warn(`no media type was specified for the slide ${slide.media}`)
            }
            slide.element = newSlide;
            document.getElementById(this.signElement).appendChild(newSlide);
        })
    }
    async start() {
        let newIndex = this.currentSlide;
        let newSlide = this.options.slides[newIndex];
        if (!newSlide.hasOwnProperty('type') && !newSlide.hasOwnProperty('media')) { console.warn('either the slide type or slide media is missing'); return; }

        let transition = newSlide.hasOwnProperty('transition') ? newSlide.transition : this.options.transition;
        animateCSS(newSlide.element, transition, () => {

        });
        if(newSlide.type == 'image') {
            setTimeout(() => {
                this.rotate();
            }, newSlide.duration*1000);
        } else if(newSlide.type == 'video') {            
            newSlide.element.getElementsByTagName('video')[0].play();
            newSlide.element.getElementsByTagName('video')[0].onended = () => {
                this.rotate();
            }
        }
    }
    rotate() {
        let oldIndex = this.currentSlide++;
        if(this.currentSlide > this.options.slides.length-1) this.currentSlide = 0;
        let newIndex = this.currentSlide;

        let oldSlide = this.options.slides[oldIndex];
        let newSlide = this.options.slides[newIndex];

        if (!newSlide.hasOwnProperty('type') && !newSlide.hasOwnProperty('media')) { console.warn('either the slide type or slide media is missing'); return; }

        let transition = newSlide.hasOwnProperty('transition') ? newSlide.transition : this.options.transition;
        if(oldIndex !== newIndex) {
            animateCSS(newSlide.element, transition, () => {
                oldSlide.element.classList.remove('show');
            });
        }
        
        if(newSlide.type == 'image') {
            setTimeout(() => {
                this.rotate();
            }, newSlide.duration*1000);
        } else if(newSlide.type == 'video') {            
            newSlide.element.getElementsByTagName('video')[0].play();
            newSlide.element.getElementsByTagName('video')[0].onended = () => {
                this.rotate();
            }
        }
    }
}

function animateCSS(element, animationName, callback) {
    element.classList.add('animated', 'show', animationName)

    function handleAnimationEnd() {
        element.classList.remove('animated', animationName)
        element.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    element.addEventListener('animationend', handleAnimationEnd)
}