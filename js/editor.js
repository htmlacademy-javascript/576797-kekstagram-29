import '/vendor/pristine/pristine.min.js';
import '/vendor/nouislider/nouislider.js';
import { isEscapeKey } from './util.js';
import { isHashtagValid, isRepeatedHashTags, isHashTagLimitExceeded } from './validators.js';
import { SCALE_STEP, FILTERS } from './const.js';


class Editor {

  constructor (form) {
    this.form = form;
    this.backDrop = form.querySelector('.img-upload__overlay');
    this.closeButton = form.querySelector('.img-upload__cancel');
    this.uploadInput = form.querySelector('.img-upload__input');

    //находим поле для редактирования масштаба загруженной картинки
    this.scaleBox = form.querySelector('.img-upload__scale');
    this.scaleInput = form.querySelector('.scale__control--value');
    this.scaleIncreaseButton = form.querySelector('.scale__control--smaller');
    this.scaleDecreaseButton = form.querySelector('.scale__control--bigger');
    this.uploadedImage = form.querySelector('.img-upload__preview img');

    //слайдер + эффекты
    this.sliderContainer = form.querySelector('.img-upload__effect-level');
    this.effectDataField = form.querySelector('.effect-level__value');
    this.sliderElement = form.querySelector('.effect-level__slider');
    this.effectsList = form.querySelector('.effects__list');

    this.hashTagFiled = form.querySelector('.text__hashtags');
    this.textareaField = form.querySelector('.text__description');

    this.pristine = new Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      // errorClass: 'form__item--invalid',
      // successClass: 'form__item--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      // errorTextClass: 'img-upload__field-wrapper_error'
    });
  }

  init () {
    this.uploadInput.addEventListener('change', (evt) => {
      //следим за открытием модального окна
      this.toggle(true);
      this.showImage(evt);
    });

    this.closeButton.addEventListener('click', () => this.toggle(false));

    // проверяем валидность хештега
    this.pristine.addValidator(
      this.hashTagFiled,
      isHashtagValid,
      'хэш-тег должен начинаться с символа #, ' +
      'хеш-тег не может состоять только из одной решётки, ' +
      'строка после решётки должна состоять из букв и чисел, ' +
      'максимальная длина одного хэш-тега 20 символов, включая решётку');

    // проверяем дублирование хештегов
    this.pristine.addValidator(
      this.hashTagFiled,
      isRepeatedHashTags,
      'один и тот же хэш-тег не может быть использован дважды');

    // проверяем максимальное количество хештегов
    this.pristine.addValidator(
      this.hashTagFiled,
      isHashTagLimitExceeded,
      'нельзя добавлять больше пяти хэш-тегов');
    /*
    * длина комментария не может составлять больше 140 символов - добавлены data атрибуты pristine
    * если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
    * */

    this.form.addEventListener('submit', (evt) => this.onSubmit(evt));
  }

  onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      // если hashtag или textarea поле в фокусе не момент события
      if (evt.target.closest('.img-upload__field-wrapper')) {
        return;
      }
      this.closeBackDrop();
    }
  }

  showBackdrop () {
    this.backDrop.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this.createSlider();
  }

  closeBackDrop() {
    this.backDrop.classList.add('hidden');
    document.body.classList.remove('modal-open');
    /*
    * при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла .img-upload__input.
    * Событие change не сработает, если загрузить ту же фотографию (окно с формой не отобразится).
    * Значение других полей формы также нужно сбрасывать.
    * */
    this.uploadInput.value = '';
    this.uploadedImage.removeAttribute('style');
    this.sliderElement.noUiSlider.destroy();
    this.hashTagFiled.value = '';
    this.textareaField.value = '';
  }

  onSubmit(evt) {
    evt.preventDefault();
    const valid = this.pristine.validate();
    window.console.log('!!!', valid);
  }

  toggle (state) {
    if (state) {
      // показываем модальное окно с загруженной картинкой
      this.showBackdrop();
      document.addEventListener('keydown', (evt) => this.onDocumentKeydown(evt));
      // следим за масштабом загруженной картинки
      this.scaleBox.addEventListener('click', (evt) => this.onResize(evt));
      this.effectsList.addEventListener('change', (evt) => this.onChangeEffect(evt));
    } else {
      this.closeBackDrop();
      document.removeEventListener('keydown', (evt) => this.onDocumentKeydown(evt));
      this.scaleBox.removeEventListener('click', (evt) => this.onResize(evt));
      this.effectsList.removeEventListener('change', (evt) => this.onResize(evt));
    }
  }

  /*
  * Масштаб:
  * #1
  * При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля
  * .scale__control--value;
  * #2
  * Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+»,
  * значение должно стать равным 75%.
  * Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
  * #3
  * При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться
  * соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит
  * значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
  */
  onResize (evt) {
    const currentInputValue = Number(this.scaleInput.value.replace('%', ''));
    let newInputValue;
    if (evt.target === this.scaleIncreaseButton) {
      if (currentInputValue === 25) {
        return;
      }

      newInputValue = currentInputValue - SCALE_STEP;
      this.scaleInput.value = `${newInputValue}%`;
      this.uploadedImage.style.transform = `scale(${newInputValue / 100})`;
    }
    if (evt.target === this.scaleDecreaseButton) {
      if (currentInputValue === 100) {
        return;
      }

      newInputValue = currentInputValue + SCALE_STEP;
      this.scaleInput.value = `${newInputValue}%`;
      this.uploadedImage.style.transform = `scale(${newInputValue / 100})`;
    }
  }

  createSlider () {
    this.sliderContainer.style.display = 'none';
    noUiSlider.create(this.sliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: function (sliderValue) {
          // число целочисленное?
          if (Number.isInteger(sliderValue)) {
            return sliderValue;
          }
          return sliderValue.toFixed(1);
        },
        from: function (sliderValue) {
          return parseFloat(sliderValue);
        },
      },
    });
  }

  /*
  * Наложение эффекта на изображение:
  * эффект умолчанию - «Оригинал» - слайдер и его контейнер (элемент .img-upload__effect-level) скрываются
  * на изображение может накладываться только один эффект
  * Интенсивность эффекта регулируется перемещением ползунка
  * уровень эффекта записывается в поле .effect-level__value
  * изображению добавляется соответсвующий фильтр с текущим уровнем эффекта слайдера (FILTERS хранит нужные настройки)
  * При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль
  * изображения и значение поля должны обновляться.
  */
  onChangeEffect (evt) {
    const inputValue = evt.target.closest('.effects__radio').value;
    if (inputValue === 'none') {
      this.sliderContainer.style.display = 'none';
      this.uploadedImage.style.filter = 'none';
      this.effectDataField.value = '100%';
      return;
    }

    const {filter, min, max, start, step, unit} = FILTERS[inputValue];

    // refresh slider options
    this.sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max
      },
      start: start,
      step: step
    });

    this.sliderContainer.style.display = 'block';

    this.sliderElement.noUiSlider.on('update', () => {
      // записываем значение в поле
      this.effectDataField.value = `${this.sliderElement.noUiSlider.get()}`;
      // добавляем стилизацию загруженной картинке
      this.uploadedImage.style.filter = `${filter}(${this.effectDataField.value}${unit})`;
    });
  }

  /*
  * Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа.
  * В данном задании этот пункт реализовывать не нужно.
  * */
  showImage (image) {
    this.image = image;
  }
}

const editor = new Editor(document.querySelector('.img-upload__form'));

editor.init();
