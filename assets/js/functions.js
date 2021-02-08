'use strict'

import {carousel, radioSlider1, imgSliders, divPointers} from "./index.js";

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

//// click image slide if slider#2.checked
function SetCurrSlide(e) {
    if (!radioSlider1.checked) {
        if (!e.target.classList.contains('currentImage')) {
            const oldCurrImg = document.querySelector('.currentImage');
            oldCurrImg.classList.replace('currentImage', 'notCurrImage');
            e.target.classList.replace('notCurrImage', 'currentImage');
            divPointers.childNodes[carousel.currentIndex].classList.replace('currImgPointer', 'notCurrImgPointer');
            carousel.currentIndex = Number(e.target.alt);
            divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
        }
    }
}

function SetImgClick() {
    for (const imgSlide of imgSliders) {
        imgSlide.addEventListener('click', SetCurrSlide);
    }
};

export {SetImgClick, CreatePointers, ChangeSlider, sliderClick};