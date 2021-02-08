'use strict'

class Slide {
    constructor(src, description) {
        this._src = src;
        this._description = description;
    }
    get src() {
        return this._src;
    }
    get description() {
        return this._description;
    }
}

class Carousel {
    constructor(slides, currentIndex = 0) {
        this._slides = slides;
        this._currentIndex = currentIndex;
    }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(value) {
        if (typeof value !== 'number') throw new TypeError();
        if (
            !Number.isSafeInteger(value) ||
            value < 0 ||
            value >= this._slides.length
        )
            throw new RangeError();
        this._currentIndex = value;
    }
    get currentSlide() {
        return this._slides[this._currentIndex];
    }

    //nextSlide
    get next1Slide() {
        return this._slides[this.next1Index];
    }
    get next2Slide() {
        return this._slides[this.next2Index];
    }
    get next3Slide() {
        return this._slides[this.next3Index];
    }
    get next4Slide() {
        return this._slides[this.next4Index];
    }

    //prevSlide
    get prev1Slide() {
        return this._slides[this.prev1Index];
    }
    get prev2Slide() {
        return this._slides[this.prev2Index];
    }
    get prev3Slide() {
        return this._slides[this.prev3Index];
    }
    get prev4Slide() {
        return this._slides[this.prev4Index];
    }

    //nextIndex
    get next1Index() {
        return (this._currentIndex + 1) % this._slides.length;
    }
    get next2Index() {
        return (this._currentIndex + 2) % this._slides.length;
    }
    get next3Index() {
        return (this._currentIndex + 3) % this._slides.length;
    }
    get next4Index() {
        return (this._currentIndex + 4) % this._slides.length;
    }

    //prevIndex
    get prev1Index() {
        return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
    }
    get prev2Index() {
        return (this._currentIndex - 2 + this._slides.length) % this._slides.length;
    }
    get prev3Index() {
        return (this._currentIndex - 3 + this._slides.length) % this._slides.length;
    }
    get prev4Index() {
        return (this._currentIndex - 4 + this._slides.length) % this._slides.length;
    }
  
    get length() { return this._slides.length; }
}

export {Slide, Carousel};