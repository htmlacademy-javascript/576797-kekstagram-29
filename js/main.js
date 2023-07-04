const NAMES = [
  'Даниил Покровский',
  'Любовь Смирнова',
  'Анна Бычкова',
  'Вероника Игнатова',
  'Ульяна Горбачева',
  'Максим Морозов',
  'Лилия Гаврилова',
  'Сергей Денисов',
  'Варвара Григорьева',
  'Арсений Горшков',
  'Богдан Малышев',
  'Артём Иванов',
  'Денис Макеев',
  'Софья Орлова',
  'Андрей Егоров',
  'Елизавета Журавлева',
  'Максим Михеев',
  'Макар Покровский',
  'Артём Дмитриев',
  'Анастасия Крылова',
  'Максим Иванов',
  'Серафима Александрова',
  'Вячеслав Николаев',
  'Роман Марков',
  'Лидия Яковлева'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'wow, wow!',
  'Loooove',
  '😍😍😍😍',
  'holy shit!',
  'Nice👍🏻',
  'magic',
  'very crazey',
  'Mamma mia',
  'Beautiful 🙏🏼'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => {
  if (elements.length === 0) {
    return undefined;
  } else if (elements.length === 1) {
    return 1;
  } else {
    return elements[getRandomInteger(0, elements.length - 1)];
  }
};

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
  const quantityOfMessages = getRandomInteger(1, 2);
  const messages = [];
  messages.push(getRandomArrayElement(MESSAGES));
  if (quantityOfMessages === 2) {
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

// window.console.log(createPhotoDescription());
createPhotoDescription();
