'use strict'

export class Carousel {
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
    nextSlide(index) {
        return this._slides[this.nextIndex(index)];
    }    

    //prevSlide
    prevSlide(index) {
        return this._slides[this.prevIndex(index)];
    }  

    //nextIndex
    nextIndex(index) {
        return (this._currentIndex + index) % this._slides.length;
    }    

    //prevIndex
    prevIndex(index) {
        return (this._currentIndex - index + this._slides.length) % this._slides.length;
    }   
  
    get length() { return this._slides.length; }
}

