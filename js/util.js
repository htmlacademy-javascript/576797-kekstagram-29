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

export {getRandomInteger, getRandomArrayElement};

