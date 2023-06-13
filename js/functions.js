/**
 * Функция для проверки длины строки.
 * @param {string} string - имя пользователя
 * @param {number} allowLength -  максимальная длина имени
 * @returns {boolean} - true, если строка меньше или равна указанной длине, и false, если строка длиннее
 */
const checkStrokeLength = (string, allowLength) => (string.length <= allowLength);

window.console.log(checkStrokeLength('проверяемая строка', 20),' ожидаю:true');
window.console.log(checkStrokeLength('проверяемая строка', 18),' ожидаю:true');
window.console.log(checkStrokeLength('проверяемая строка', 10),' ожидаю:false');

/**
 * Функция для проверки, является ли строка палиндромом.
 * @param {string} string - проверяемая строка
 * @returns {boolean}
 */
function isPalindrome (string) {
  const currentString = string.replaceAll(' ', '').toLowerCase();
  let rotateString = '';
  for (let i = currentString.length - 1; i > -1; i--) {
    rotateString += currentString[i];
  }
  return (rotateString === currentString);
}

window.console.log(isPalindrome('топот'),' ожидаю:true');
window.console.log(isPalindrome('ДовОд'),' ожидаю:true');
window.console.log(isPalindrome('Кекс'),' ожидаю:false');
window.console.log(isPalindrome('Лёша на полке клопа нашёл'),' ожидаю:true');

/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры, функция должна вернуть NaN
 */
function catchNumber(string) {
  const currentString = string.toString().replaceAll(' ', '');
  let finallyString = '';
  for (const letter of currentString) {
    if (!isNaN(letter)) {
      finallyString += letter;
    }
  }

  if (parseInt(finallyString, 10)) {
    return Number(finallyString);
  }
  return NaN;
}

window.console.log(catchNumber('2023 год'), ' ожидаю 2023');
window.console.log(catchNumber('ECMAScript 2022'), ' ожидаю 2022');
window.console.log(catchNumber('1 кефир, 0.5 батона'), ' ожидаю 105');
window.console.log(catchNumber('агент 007'), ' ожидаю 7');
window.console.log(catchNumber('а я томат'), ' ожидаю NaN');
