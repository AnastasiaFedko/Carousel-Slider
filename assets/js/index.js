'use strict'

import {Carousel} from "./Classes/Carousel.js";
import {Slide} from './Classes/Slide.js';
import {SetImgClick, CreatePointers, ChangeSlider, sliderClick, SetNewImgIndex, ChangeCurrentImgSlidePosition } from "./functions.js";


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
    ), 
    new Slide(
        'https://print4you.com.ua/upload/resize_cache/iblock/ef0/640_250_1/ef000921e841fd947b984e82d2038e97.jpg',
        'Рождение Венеры, Боттичелли Сандро'
    ), 
    new Slide(
        'https://12millionov.com/wp-content/uploads/2020/03/5a-Girl-Vermeer.jpg',
        'Девушка с жемчужной серёжкой, Вермеер Ян'
    )
]);

const [prevButtonElem, nextButtonElem] = document.querySelectorAll('.btn');

prevButtonElem.addEventListener('click', sliderClick('prev'));
nextButtonElem.addEventListener('click', sliderClick('next'));

const divCheck = document.getElementById('check1');
divCheck.addEventListener('click', ChangeSlider);

const labelSlider1 = document.getElementById('lbl1');
labelSlider1.addEventListener('click', ChangeCurrentImgSlidePosition);
const radioSlider1 = document.getElementById('slider1');

const divPointers = document.getElementById('pointers');
CreatePointers();
SetNewImgIndex();
SetImgClick();

export {carousel, radioSlider1, divPointers};