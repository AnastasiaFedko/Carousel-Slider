'use strict'

export class Slide {
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