'use strict'

import { carousel, radioSlider1, divPointers } from "./index.js";

const sliderClick = (direction = 'next') => (e) => {
    carousel.currentIndex = direction == 'next' ? carousel.nextIndex(1) : carousel.prevIndex(1);
    radioSlider1.checked ? SetNewImgIndex() : updateSlide(direction);
    divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
    direction == 'next' ? divPointers.childNodes[carousel.prevIndex(1)].classList.replace('currImgPointer', 'notCurrImgPointer') :
        divPointers.childNodes[carousel.nextIndex(1)].classList.replace('currImgPointer', 'notCurrImgPointer');
};

function ChangeCurrentImgSlidePosition() {
    const curImg = document.querySelector('.currentImage');
    if (curImg.id !== 'middleImage') {
        curImg.classList.replace('currentImage', 'notCurrImage');
        const newCurImg = document.getElementById('middleImage');
        newCurImg.classList.replace('notCurrImage', 'currentImage');
    }
    SetNewImgIndex();
}

function updateSlide(direction) {
    if (direction == 'next') {
        const currentImgSlide = document.querySelector('.currentImage');
        if (currentImgSlide.nextElementSibling != null) {
            const rightImgSlide = currentImgSlide.nextElementSibling;
            currentImgSlide.classList.replace('currentImage', 'notCurrImage');
            rightImgSlide.classList.replace('notCurrImage', 'currentImage');
            rightImgSlide.setAttribute('src', carousel.currentSlide.src);
            rightImgSlide.setAttribute('alt', carousel.currentIndex);
            if (rightImgSlide.nextElementSibling !== null) {
                SetAttributesToRight(rightImgSlide.nextElementSibling);
                SetSizeToRight(rightImgSlide);
            }
            SetAttributesToLeft(rightImgSlide.previousElementSibling);
            SetSizeToLeft(rightImgSlide);
        }
        else {
            currentImgSlide.setAttribute('src', carousel.currentSlide.src);
            currentImgSlide.setAttribute('alt', carousel.currentIndex);
            SetAttributesToLeft(currentImgSlide.previousElementSibling);
        }
    }
    else {
        const currentImgSlide = document.querySelector('.currentImage');
        if (currentImgSlide.previousElementSibling != null) {
            const leftImgSlide = currentImgSlide.previousElementSibling;
            leftImgSlide.classList.replace('notCurrImage', 'currentImage');
            currentImgSlide.classList.replace('currentImage', 'notCurrImage');
            leftImgSlide.setAttribute('src', carousel.currentSlide.src);
            leftImgSlide.setAttribute('alt', carousel.currentIndex);
            if (leftImgSlide.previousElementSibling != null) {
                SetAttributesToLeft(leftImgSlide.previousElementSibling);
                SetSizeToLeft(leftImgSlide);
            }
            SetAttributesToRight(leftImgSlide.nextElementSibling);
            SetSizeToRight(leftImgSlide);
        }
        else {
            currentImgSlide.setAttribute('src', carousel.currentSlide.src);
            currentImgSlide.setAttribute('alt', carousel.currentIndex);
            SetAttributesToRight(currentImgSlide.nextElementSibling);
        }
    }
}

function ChangeSlider() {
    const radioSlider2 = document.getElementById('slider2');
    if (radioSlider1.checked) {
        radioSlider2.checked = true
    }
    else {
        radioSlider1.checked = true;
        ChangeCurrentImgSlidePosition();
    }
};

//// click on pointer to change index of current image
function SetCurrSlideOnPointerClick(e) {
    const allPointers = divPointers.children;
    divPointers.childNodes[carousel.currentIndex].classList.replace('currImgPointer', 'notCurrImgPointer');
    for (let i = 0; i < allPointers.length; i++) {
        if (allPointers[i] == e.target) {
            carousel.currentIndex = i;
            break;
        }
    }
    divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');

    const currentImgSlide = document.querySelector('.currentImage');
    currentImgSlide.setAttribute('src', carousel.currentSlide.src);
    currentImgSlide.setAttribute('alt', carousel.currentIndex);

    if (currentImgSlide.previousElementSibling != null) {
        SetAttributesToLeft(currentImgSlide.previousElementSibling);
    }
    if (currentImgSlide.nextElementSibling !== null) {
        SetAttributesToRight(currentImgSlide.nextElementSibling);
    }
};

function CreatePointers() {
    for (let i = 0; i < carousel.length; i++) {
        divPointers.append(document.createElement('span'));
    }
    for (const spanEl of divPointers.children) {
        spanEl.classList.add('notCurrImgPointer');
        spanEl.classList.add('imgPointer');
        spanEl.addEventListener('click', SetCurrSlideOnPointerClick);
    }
    divPointers.children[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
};

//// click image slide
function SetCurrSlide(e) {
    if (!radioSlider1.checked) {
        if (!e.target.classList.contains('currentImage')) {
            const oldCurrImg = document.querySelector('.currentImage');
            oldCurrImg.classList.replace('currentImage', 'notCurrImage');
            e.target.classList.replace('notCurrImage', 'currentImage');
            SetNewPointIndex(e);
            if (e.target.previousElementSibling !== null)
                SetSizeToLeft(e.target);
            if (e.target.nextElementSibling !== null)
                SetSizeToRight(e.target);
        }
    }
    else {
        SetNewPointIndex(e);
        SetNewImgIndex();
    }
}

function SetNewPointIndex(e){
    divPointers.childNodes[carousel.currentIndex].classList.replace('currImgPointer', 'notCurrImgPointer');
    carousel.currentIndex = Number(e.target.alt);
    divPointers.childNodes[carousel.currentIndex].classList.replace('notCurrImgPointer', 'currImgPointer');
}

////add event onclick on slides
function SetImgClick() {
    const imgSliders = document.querySelectorAll('.slideImg');
    for (const imgSlide of imgSliders) {
        imgSlide.addEventListener('click', SetCurrSlide);
    }
};

function SetNewImgIndex() {
    const curImg = document.querySelector('.currentImage');
    curImg.setAttribute('src', carousel.currentSlide.src);
    curImg.setAttribute('alt', carousel.currentIndex);

    const nextImg = document.getElementById('nextImage');
    nextImg.setAttribute('src', carousel.nextSlide(1).src);
    nextImg.setAttribute('alt', carousel.nextIndex(1));

    const nextEndImg = document.getElementById('nextEndImage');
    nextEndImg.setAttribute('src', carousel.nextSlide(2).src);
    nextEndImg.setAttribute('alt', carousel.nextIndex(2));

    const prevImg = document.getElementById('prevImage');
    prevImg.setAttribute('src', carousel.prevSlide(1).src);
    prevImg.setAttribute('alt', carousel.prevIndex(1));

    const prevEndImg = document.getElementById('prevEndImage');
    prevEndImg.setAttribute('src', carousel.prevSlide(2).src);
    prevEndImg.setAttribute('alt', carousel.prevIndex(2));
    SetSizeToLeft(curImg);
    SetSizeToRight(curImg);
};

////change img size
function SetSizeToRight(currImgEl, value = 280) {
    currImgEl.style.width = `${value}px`;
    currImgEl.style.height = `${value - 20}px`;
    if (currImgEl.nextElementSibling !== null) {
        SetSizeToRight(currImgEl.nextElementSibling, value - 30);
    }
};
function SetSizeToLeft(currImgEl, value = 280) {
    currImgEl.style.width = `${value}px`;
    currImgEl.style.height = `${value - 20}px`;
    if (currImgEl.previousElementSibling !== null) {
        SetSizeToLeft(currImgEl.previousElementSibling, value - 30);
    }
};

////set attributes for slides
function SetAttributesToRight(currImgEl, index = 1) {
    currImgEl.setAttribute('src', carousel.nextSlide(index).src);
    currImgEl.setAttribute('alt', carousel.nextIndex(index));
    if (currImgEl.nextElementSibling !== null) {
        SetAttributesToRight(currImgEl.nextElementSibling, index + 1);
    }
};

function SetAttributesToLeft(currImgEl, index = 1) {
    currImgEl.setAttribute('src', carousel.prevSlide(index).src);
    currImgEl.setAttribute('alt', carousel.prevIndex(index));
    if (currImgEl.previousElementSibling !== null) {
        SetAttributesToLeft(currImgEl.previousElementSibling, index + 1);
    }
};

export { SetImgClick, CreatePointers, ChangeSlider, sliderClick, SetNewImgIndex, ChangeCurrentImgSlidePosition };