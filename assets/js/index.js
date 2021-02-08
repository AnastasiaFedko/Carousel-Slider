'use strict'

/*classes*/

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
    get nextSlide() {
        return this._slides[this.nextIndex];
    }
    get prevSlide() {
        return this._slides[this.prevIndex];
    }
    get prevPrevSlide() {
        return this._slides[this.prevPrevIndex];
    }
    get nextNextSlide() {
        return this._slides[this.nextNextIndex];
    }
    get nextIndex() {
        return (this._currentIndex + 1) % this._slides.length;
    }
    get prevIndex() {
        return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
    }
    get prevPrevIndex() {
        return (this._currentIndex - 2 + this._slides.length) % this._slides.length;
    }
    get nextNextIndex() {
        return (this._currentIndex + 2) % this._slides.length;
    }
    get length() { return this._slides.length; }
}

/*functions*/

const sliderClick = (direction = 'next') => (e) => {
    carousel.currentIndex =
        carousel[direction == 'next' ? 'nextIndex' : 'prevIndex'];
    radioSlider1.checked ? updateSlide1() : updateSlide2(direction);
    divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
    direction == 'next' ? divPointers.childNodes[carousel.prevIndex].classList.replace('currImgPointer', 'notCurrImgPointer') :
        divPointers.childNodes[carousel.nextIndex].classList.replace('currImgPointer', 'notCurrImgPointer');
};

function updateSlide1() {
    const newRrevImg = document.querySelector('.prevImage');
    const oldCurrentImg = document.querySelector('.currentImage');
    if (oldCurrentImg !== newRrevImg.nextSibling) {
        oldCurrentImg.classList.replace('currentImage', 'notCurrImage');
        const newCurrentImg = newRrevImg.nextElementSibling;
        newCurrentImg.classList.replace('notCurrImage', 'currentImage');
        newCurrentImg.setAttribute('src', carousel.currentSlide.src);
        newCurrentImg.setAttribute('alt', carousel.currentIndex);
    }
    else {
        oldCurrentImg.setAttribute('src', carousel.currentSlide.src);
        oldCurrentImg.setAttribute('alt', carousel.currentIndex);
    }
    newRrevImg.setAttribute('src', carousel.prevSlide.src);
    newRrevImg.setAttribute('alt', carousel.prevIndex);

    const newNextImg = document.querySelector('.nextImage');
    newNextImg.setAttribute('src', carousel.nextSlide.src);
    newNextImg.setAttribute('alt', carousel.nextIndex);
}

function updateSlide2(direction) {
    if (direction == 'next') {
        const currentImgSlide = document.querySelector('.currentImage');
        if (currentImgSlide.nextElementSibling != null) {
            const rightImgSlide = currentImgSlide.nextElementSibling;

            if (rightImgSlide.nextElementSibling != null) {
                const rightEndImgSlide = rightImgSlide.nextElementSibling;
                rightEndImgSlide.setAttribute('src', carousel.nextSlide.src);
                rightEndImgSlide.setAttribute('alt', carousel.nextIndex);
            }
            else {
                const leftImgSlide = currentImgSlide.previousElementSibling;
                leftImgSlide.setAttribute('src', carousel.prevPrevSlide.src);
                leftImgSlide.setAttribute('alt', carousel.prevPrevIndex);
            }
            currentImgSlide.setAttribute('src', carousel.prevSlide.src);
            currentImgSlide.setAttribute('alt', carousel.prevIndex);
            currentImgSlide.classList.replace('currentImage', 'notCurrImage');

            rightImgSlide.setAttribute('src', carousel.currentSlide.src);
            rightImgSlide.setAttribute('alt', carousel.currentIndex);
            rightImgSlide.classList.replace('notCurrImage', 'currentImage');
        }
        else {
            currentImgSlide.setAttribute('src', carousel.currentSlide.src);
            currentImgSlide.setAttribute('alt', carousel.currentIndex);

            const leftImgSlide = currentImgSlide.previousElementSibling;
            leftImgSlide.setAttribute('src', carousel.prevSlide.src);
            leftImgSlide.setAttribute('alt', carousel.prevIndex);

            const leftEndImgSlide = leftImgSlide.previousElementSibling;
            leftEndImgSlide.setAttribute('src', carousel.prevPrevSlide.src);
            leftEndImgSlide.setAttribute('alt', carousel.prevPrevIndex);
        }
    }
    else {
        const currentImgSlide = document.querySelector('.currentImage');
        if (currentImgSlide.previousElementSibling != null) {
            const leftImgSlide = currentImgSlide.previousElementSibling;
            if (leftImgSlide.previousElementSibling != null) {
                const leftEndImgSlide = leftImgSlide.previousElementSibling;
                leftEndImgSlide.setAttribute('src', carousel.prevSlide.src);
                leftEndImgSlide.setAttribute('alt', carousel.prevIndex);
            }
            else {
                const rightImgSlide = currentImgSlide.nextElementSibling;
                rightImgSlide.setAttribute('src', carousel.nextNextSlide.src);
                rightImgSlide.setAttribute('alt', carousel.nextNextIndex);
            }
            currentImgSlide.setAttribute('src', carousel.nextSlide.src);
            currentImgSlide.setAttribute('alt', carousel.nextIndex);
            currentImgSlide.classList.replace('currentImage', 'notCurrImage');

            leftImgSlide.setAttribute('src', carousel.currentSlide.src);
            leftImgSlide.setAttribute('alt', carousel.currentIndex);
            leftImgSlide.classList.replace('notCurrImage', 'currentImage');
        }
        else {
            currentImgSlide.setAttribute('src', carousel.currentSlide.src);
            currentImgSlide.setAttribute('alt', carousel.currentIndex);

            const rightImgSlide = currentImgSlide.nextElementSibling;
            rightImgSlide.setAttribute('src', carousel.nextSlide.src);
            rightImgSlide.setAttribute('alt', carousel.nextIndex);

            const rightEndImgSlide = rightImgSlide.nextElementSibling;
            rightEndImgSlide.setAttribute('src', carousel.nextNextSlide.src);
            rightEndImgSlide.setAttribute('alt', carousel.nextNextIndex);
        }
    }
}

function ChangeSlider() {
    const radioSlider1 = document.getElementById('slider1');
    const radioSlider2 = document.getElementById('slider2');
    radioSlider1.checked ? radioSlider2.checked = true : radioSlider1.checked = true;
};

function CreatePointers() {
    for (let i = 0; i < carousel.length; i++) {
        divPointers.append(document.createElement('span'));
    }
    for (const spanEl of divPointers.childNodes) {
        spanEl.classList.add('notCurrImgPointer');
        spanEl.classList.add('imgPointer');
    }
    divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
};

function SetCurrSlide(e) {
    if (!radioSlider1.checked) {
        if (!e.target.classList.contains('currentImage')) {
            const oldCurrImg = document.querySelector('.currentImage');
            oldCurrImg.classList.replace('currentImage', 'notCurrImage');
            e.target.classList.replace('notCurrImage', 'currentImage');
            carousel.currentIndex = Number(e.target.alt);
        }
    }
}

function SetImgClick() {
    for (const imgSlide of imgSliders) {
        imgSlide.addEventListener('click', SetCurrSlide);
    }
};

/*main*/

const carousel = new Carousel([
    new Slide(
        'https://losko.ru/wp-content/uploads/2019/11/7702b9faef4382f33090b0b87b2c0ad0-1.jpg',
        'Звездная ночь, Ван Гог'
    ),
    new Slide(
        'https://art-holst.com.ua/wp-content/uploads/2020/06/znamenitie_hudochniki22.jpg',
        'Крик, Эдвард Мунк'
    ),
    new Slide(
        'https://scientificrussia.ru/data/shared/top_10/kartiny/Kramskoy_Portrait_of_a_Woman.jpg',
        'Неизвестная, Иван Крамской'
    ),
    new Slide(
        'https://scientificrussia.ru/data/shared/top_10/kartiny/141.jpg',
        'Девочка с персиками, Валентин Серов'
    ),
    new Slide(
        'https://scientificrussia.ru/data/shared/top_10/kartiny/Die_drei_Bogatyr.jpg',
        'богатыри'
    ),
    new Slide(
        'https://art-holst.com.ua/wp-content/uploads/2020/06/znamenitie_hudochniki3.jpeg',
        'Мона Лиза, Леонардо до Винчи'
    ),
    new Slide(
        'https://losko.ru/wp-content/uploads/2019/11/ebd7ff7f9d8ddb7b9a8502168187.jpg',
        'Постоянство памяти, Сфльвадор Дали'
    )
]);

const [prevButtonElem, nextButtonElem] = document.querySelectorAll('.btn');

prevButtonElem.addEventListener('click', sliderClick('prev'));
nextButtonElem.addEventListener('click', sliderClick('next'));

const radioSlider1 = document.getElementById('slider1');

const curImg = document.querySelector('.currentImage');
curImg.setAttribute('src', carousel.currentSlide.src);
curImg.setAttribute('alt', carousel.currentIndex);

const nextImg = document.querySelector('.nextImage');
nextImg.setAttribute('src', carousel.nextSlide.src);
nextImg.setAttribute('alt', carousel.nextIndex);

const prevImg = document.querySelector('.prevImage');
prevImg.setAttribute('src', carousel.prevSlide.src);
prevImg.setAttribute('alt', carousel.prevIndex);

const imgSliders = [prevImg, curImg, nextImg];
SetImgClick();

const divCheck = document.getElementById('check1');
divCheck.addEventListener('click', ChangeSlider);

const divPointers = document.getElementById('pointers');
CreatePointers();