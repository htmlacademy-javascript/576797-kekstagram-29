const filterSection = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const allButtons = filterForm.querySelectorAll('[type="button"]');
import {getRandomArrayElement} from './util.js';
import {IMAGE_FILTER} from './const.js';

const showActiveButton = (evt) => {
  allButtons.forEach((elem) => {
    if (elem.id === evt.target.id) {
      if (!elem.classList.contains('img-filters__button--active')) {
        elem.classList.add('img-filters__button--active');
      }
    } else {
      if (elem.classList.contains('img-filters__button--active')) {
        elem.classList.remove('img-filters__button--active');
      }
    }
  });
};

// добавляет стили активной кнопке и прокидываем в cb название нужного фильтра
const setShowFilter = (cb) => {
  filterForm.addEventListener('click', (evt) => {
    showActiveButton(evt);
    cb(IMAGE_FILTER[evt.target.id]);
  });
};

// вернет отсортированный массив - 10 случайных, не повторяющихся фотографий
const sortPhotoList = (list, method) => {
  if (method === 'random') {
    const newList = [];
    let currentIteration = 0;

    while (newList.length < 10 && currentIteration < list.length) {
      const newItem = getRandomArrayElement(list);

      if (!newList.find((el) => el.url === newItem.url)) {
        newList.push(newItem);
      }

      currentIteration++;
    }

    return newList;
  }
  // вернет тот же массив, отсортированный в порядке убывания количества комментариев
  if (method === 'top') {
    const getSortParameter = (item) => item.comments.length;

    const compareCommentsLength = (a, b) => {
      const paramA = getSortParameter(a);
      const paramB = getSortParameter(b);

      return paramB - paramA;
    };

    list.sort(compareCommentsLength);

    return list;
  }
};

export {
  filterSection,
  setShowFilter,
  sortPhotoList,
};

