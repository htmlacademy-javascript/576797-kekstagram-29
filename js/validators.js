/*
* Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами.
* Набор хэш-тегов можно превратить в массив,воспользовавшись методом .split().
* Он разбивает строки на массивы. После этого, вы можете написать цикл, который
* будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям. Если хотя
* бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.
* */

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

// приводим значение поля к массиву и убираем пустые строки
const hashTags = (value) => value.trim().split(' ').filter((el) => el.length !== 0);

/*
* хэш-тег начинается с символа #;
* строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т.д.;
* хеш-тег не может состоять только из одной решётки;
* максимальная длина одного хэш-тега 20 символов, включая решётку;
* */
const isHashtagValid = (value) => hashTags(value).every((el) => VALID_SYMBOLS.test(el));

//один и тот же хэш-тег не может быть использован дважды
const isRepeatedHashTags = (value) => {
  // хэш-теги нечувствительны к регистру
  const lowerCaseHashTags = hashTags(value).map((el) => el.toLowerCase());
  // создаем новый объект без повторяющихся элементов и приводим его к массиву
  const newHashTags = Array.from(new Set(lowerCaseHashTags));
  return newHashTags.length === hashTags(value).length;
};

// можно добавлять не больше пяти хэш-тегов
const isHashTagLimitExceeded = (value) => hashTags(value).length <= MAX_HASHTAG_COUNT;

export {isHashtagValid, isRepeatedHashTags, isHashTagLimitExceeded};

