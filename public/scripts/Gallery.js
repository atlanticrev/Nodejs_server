class Gallery {

    constructor () {
        this.viewport = this.getDomElement(this.getTemplate());
        this.slides = this.viewport.querySelectorAll('.slide');
        this.slidesContainer = this.viewport.querySelector('.slides-container');
        this.controls = [];

        this.currSlideIndex = 0;

        this.coords = {
            prev: 0,
            start: null,
            curr: null
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.slidesContainer.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);

        this.render();
    }

    render () {
        document.body.appendChild(this.viewport);

        // @todo How it works?
        this.slides.forEach((slide) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log('intersected', entry.target);
                }, {theshold: 0.25});
            });
            observer.observe(slide);
        });

        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.MIN_OFFSET = -(this.slideWidth * (this.slides.length - 1)); // (-1) direction
        this.MAX_OFFSET = 0;
    }

    onMouseDown (e) {
        this.coords.start = e.clientX;
        document.addEventListener('mousemove', this.onMouseMove);        
    }

    onMouseMove (e) {
        this.coords.curr = this.coords.prev + e.clientX - this.coords.start;
        this.coords.curr = Math.min(this.MAX_OFFSET, Math.max(this.coords.curr, this.MIN_OFFSET));
        this.slidesContainer.style.setProperty('--transform', `${this.coords.curr}px`);
    }

    onMouseUp (e) {
        this.coords.prev = this.coords.curr;
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    getDomElement (layout) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = layout;
        return wrapper.firstElementChild;        
    }

    getTemplate () {
        return `
            <div class="viewport" draggable="false">
                <div class="slides-container" draggable="false">
                    <div class="slide" draggable="false">1</div>
                    <div class="slide" draggable="false">2</div>
                    <div class="slide" draggable="false">3</div>
                    <div class="slide" draggable="false">4</div>
                    <div class="slide" draggable="false">5</div> 
                </div>
            </div>
        `;
    }

    nextSlide () {
        const newPos = Math.max(-(this.currSlideIndex + 1) * this.slideWidth, this.MIN_OFFSET);
        this.currSlideIndex = Math.min(++this.currSlideIndex, this.slides.length - 1);
        this.slidesContainer.style.setProperty('--transform', `${newPos}px`);
        console.log(this.currSlideIndex);
    }

    prevSlide () {
        const newPos = Math.min(-(this.currSlideIndex - 1) * this.slideWidth, this.MAX_OFFSET);
        this.currSlideIndex = Math.max(--this.currSlideIndex, 0);
        this.slidesContainer.style.setProperty('--transform', `${newPos}px`);
        console.log(this.currSlideIndex);
    }

}

const gallery = new Gallery();