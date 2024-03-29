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

const MAX_HASHTAG_COUNT = 5;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const SCALE_STEP = 25;

const FILTERS = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  },
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: ''
  }
};

const IMAGE_FILTER = {
  'filter-default': 'default',
  'filter-random': 'random',
  'filter-discussed': 'top',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  MAX_HASHTAG_COUNT,
  VALID_SYMBOLS,
  SCALE_STEP,
  FILTERS,
  IMAGE_FILTER,
  FILE_TYPES,
};

