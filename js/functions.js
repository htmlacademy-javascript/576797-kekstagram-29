/**
 * Функция для проверки длины строки.
 * @param {string} string - имя пользователя
 * @param {number} allowLength -  максимальная длина имени
 * @returns {boolean} - true, если строка меньше или равна указанной длине, и false, если строка длиннее
 */
const checkValidStringLength = (string, allowLength) => (string.length <= allowLength);

checkValidStringLength('проверяемая строка', 20);


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
  return rotateString === currentString;
}
isPalindrome('Лёша на полке клопа нашёл');


/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры, функция должна вернуть NaN
 */
function getNumberFromString(data) {
  const currentString = data.toString().replaceAll(' ', '');
  let finallyString = '';
  for (const letter of currentString) {
    if (!Number.isNaN(Number(letter))) {
      finallyString += letter;
    }
  }
  if (parseInt(finallyString, 10)) {
    return finallyString;
  }
  return NaN;
}
getNumberFromString('ECMAScript 2022');
// window.console.log(getNumberFromString('2023 год'), 2023);
// window.console.log(getNumberFromString('ECMAScript 2022'), 2022);
// window.console.log(getNumberFromString('1 кефир, 0.5 батона'), 105);
// window.console.log(getNumberFromString('агент 007'), 7);
// window.console.log(getNumberFromString('а я томат'), NaN);
// window.console.log(getNumberFromString(234), 234);


const getTimeFromString = (str) => {
  const [hours, minutes] = str.split(':').map(Number);
  return {hours, minutes};
};
/*
  возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
*/
function isWorkTime(startOfWorkDay, endOfWorkDay, startOfWorkCall, callDuration) {
  const startWork = getTimeFromString(startOfWorkDay);
  const endWork = getTimeFromString(endOfWorkDay);
  const startOfCall = getTimeFromString(startOfWorkCall);
  //если звонок начинается раньше рабочего времени
  if (startOfCall.hours < startWork.hours) {
    return false;
  }
  const hoursLeft = endWork.hours - startOfCall.hours;
  const minutesLeft = endWork.minutes - startOfCall.minutes;
  const remainingWorkingTime = hoursLeft * 60 + minutesLeft;
  return remainingWorkingTime >= callDuration;
}
isWorkTime('08:00', '17:30', '14:00', 90); // true
// isWorkTime('8:0', '10:0', '8:0', 120); // true
// isWorkTime('08:00', '14:30', '14:00', 90); // false
// isWorkTime('14:00', '17:30', '08:0', 90); // false
// isWorkTime('8:00', '17:30', '08:00', 900); // false
