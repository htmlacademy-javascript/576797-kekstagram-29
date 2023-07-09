import {getRandomInteger, getRandomArrayElement} from './util.js';
import {NAMES, MESSAGES, DESCRIPTIONS} from './const.js';

const generateRandomId = (min, max) => {
  const usedId = [];

  return function () {
    let currentId;

    if (usedId.length === max) {
      window.console.log('ID generation limit exceeded');
      return;
    }

    if (usedId.length === 0) {
      currentId = getRandomInteger(min, max);
      usedId.push(currentId);
      return currentId;
    }

    do {
      currentId = getRandomInteger(min, max);
    } while (usedId.indexOf(currentId) !== -1);//true

    usedId.push(currentId);
    return currentId;
  };
};

const photoId = generateRandomId(1, 30);
const imageId = generateRandomId(1, 30);

/**
 * @return {string} - одно или два случайных предложения из массива MESSAGES
 * */
const getMessage = () => {
  const messages = [];
  messages.push(getRandomArrayElement(MESSAGES));
  if (getRandomInteger(0, 1) === 1) {
    messages.push(getRandomArrayElement(MESSAGES));
  }
  return messages.join(' ');
};

/**
 * @return Object
 * id {number} - id комментария (не должны повторяться);
 * avatar {string} - случайное число от 1 до 6;
 * message {string} - одно или два случайных предложения из массива MESSAGES;
 * name {string} - случайное имя из массива NAMES;
 */
function createComment() {
  return ({
    id: photoId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg.`,
    message: getMessage(),
    name: getRandomArrayElement(NAMES)
  });
}

/**
 *  * @return Object
 * id {number} - id опубликованной фотографии (не должны повторяться);
 * url {string} - адрес картинки (не должны повторяться);
 * description {string} - случайное описание фотографии из массива DESCRIPTIONS;
 * likes {number} - количество лайков у фотографии (случайное число от 15 до 200);
 * comments {array} - массив объектов, список комментариев createComment() (случайное число от 0 до 30)
 * */
const createPhotoDescription = () => ({
  id: photoId(),
  url: `photos/${imageId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0 ,30)}, createComment)
});

export {createPhotoDescription};
