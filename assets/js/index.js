'use strict'

import {Slide, Carousel} from "./classes.js";
import {SetImgClick, CreatePointers, ChangeSlider, sliderClick} from "./functions.js";


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

export {carousel, radioSlider1, imgSliders, divPointers};