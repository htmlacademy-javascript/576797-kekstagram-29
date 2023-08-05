import '/vendor/pristine/pristine.min.js';
import '/vendor/nouislider/nouislider.js';
import {isHashtagsValid, isHashTagUnique, isHashTagLimitExceeded} from './validators.js';
import {SCALE_STEP, FILTERS, FILE_TYPES} from './const.js';
import {sendData} from './api.js';

export default class Editor {

  constructor (form, modals, messageModal) {
    this.modals = modals;
    this.messageModal = messageModal;
    this.form = form;
    this.backDrop = form.querySelector('.img-upload__overlay');
    this.closeButton = form.querySelector('.img-upload__cancel');
    this.uploadInput = form.querySelector('.img-upload__input');
    this.submitButton = form.querySelector('.img-upload__submit');

    //находим поле для редактирования масштаба загруженной картинки
    this.scaleBox = form.querySelector('.img-upload__scale');
    this.scaleInput = form.querySelector('.scale__control--value');
    this.scaleDecreaseButton = form.querySelector('.scale__control--smaller');
    this.scaleIncreaseButton = form.querySelector('.scale__control--bigger');
    this.uploadedImage = form.querySelector('.img-upload__preview img');
    this.prewiewImages = form.querySelectorAll('.effects__preview');

    //слайдер + эффекты
    this.sliderContainer = form.querySelector('.img-upload__effect-level');
    this.effectDataField = form.querySelector('.effect-level__value');
    this.sliderElement = form.querySelector('.effect-level__slider');
    this.effectsList = form.querySelector('.effects__list');
    this.defaultListItem = form.querySelector('#effect-none');

    this.hashTagFiled = form.querySelector('.text__hashtags');
    this.textareaField = form.querySelector('.text__description');

    this.pristine = new Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
    });

    this.onResize = this.onResize.bind(this);
    this.onChangeEffect = this.onChangeEffect.bind(this);
  }

  init () {
    this.uploadInput.addEventListener('change', () => {
      //следим за открытием модального окна
      this.toggle(true);
      // показываем загруженную картинку
      this.showImage();
    });

    this.closeButton.addEventListener('click', () => this.toggle(false));

    // проверяем валидность хештега
    this.pristine.addValidator(
      this.hashTagFiled,
      isHashtagsValid,
      'хэш-тег должен начинаться с символа #, хеш-тег не может состоять только из одной решётки, строка после решётки должна состоять из букв и чисел, максимальная длина одного хэш-тега 20 символов, включая решётку');

    // проверяем дублирование хештегов
    this.pristine.addValidator(
      this.hashTagFiled,
      isHashTagUnique,
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

  toggle (state) {
    if (state) {
      this.modals.add(this);
      this.showModal();
    } else {
      this.closeModal();
    }
  }

  showModal () {
    this.backDrop.classList.remove('hidden');
    document.body.classList.add('modal-open');
    // создаем slider
    this.createSlider();
    // добавляем события на scale & slider
    this.scaleBox.addEventListener('click', this.onResize);
    this.effectsList.addEventListener('change', this.onChangeEffect);
  }

  closeModal() {
    this.backDrop.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.pristine.reset();
    // сбрасываем значение полей
    this.uploadInput.value = '';
    this.uploadedImage.removeAttribute('style');
    this.scaleInput.value = '100%';
    if (this.sliderElement.noUiSlider) {
      this.sliderElement.noUiSlider.destroy();
    }
    this.defaultListItem.checked = true;
    this.hashTagFiled.value = '';
    this.textareaField.value = '';
    // удаляем события на scale & slider
    this.scaleBox.removeEventListener('click', this.onResize);
    this.effectsList.removeEventListener('change', this.onChangeEffect);
  }

  // modals.js
  hide () {
    this.closeModal();
    this.modals.remove(this);
  }

  // масштабирование загруженной картинки
  onResize (evt) {
    // оставляем только цифры
    const currentInputValue = Number(this.scaleInput.value.replace(/[^\d]/g,''));
    let newInputValue;

    if (evt.target === this.scaleDecreaseButton) {
      newInputValue = Math.max(25, currentInputValue - SCALE_STEP);
    }

    if (evt.target === this.scaleIncreaseButton) {
      newInputValue = Math.min(100, currentInputValue + SCALE_STEP);
    }

    this.scaleInput.value = `${newInputValue}%`;
    this.uploadedImage.style.transform = `scale(${newInputValue / 100})`;
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
            return sliderValue.toFixed(2);
          }
          return sliderValue.toFixed(2);
        },
        from: function (sliderValue) {
          return parseFloat(sliderValue);
        },
      },
    });

    this.effectsList.addEventListener('change', (evt) => this.onChangeEffect(evt));
  }

  // Наложение эффекта на изображение
  onChangeEffect (evt) {
    const inputValue = evt.target.closest('.effects__radio').value;
    this.effectDataField.value = '100%';
    if (inputValue === 'none') {
      this.sliderContainer.style.display = 'none';
      this.uploadedImage.style.filter = 'none';
      return;
    }

    const {filter, min, max, start, step, unit} = FILTERS[inputValue];

    // refresh slider options
    this.sliderElement.noUiSlider.updateOptions({
      range: {
        min,
        max
      },
      start,
      step
    });

    this.sliderContainer.style.display = 'block';

    this.sliderElement.noUiSlider.on('update', () => {
      // записываем значение в поле
      this.effectDataField.value = this.sliderElement.noUiSlider.get();

      // добавляем стилизацию загруженной картинке
      const filterValue = `${filter}(${this.effectDataField.value}${unit})`;
      this.uploadedImage.style.filter = filterValue;
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const isValid = this.pristine.validate();
    if (isValid) {
      this.blockSubmitButton();

      sendData('submit', new FormData(evt.target))
        .then(() => this.closeModal())
        .then(() => this.messageModal.show('success'))
        .catch(() => this.messageModal.show('error'))
        .finally(() => this.unblockSubmitButton());
    }
  }

  blockSubmitButton() {
    this.submitButton.disabled = true;
  }

  unblockSubmitButton() {
    this.submitButton.disabled = false;
  }

  /*
  * Подставляет выбранное изображения в форму
  * */
  showImage () {
    this.image = this.uploadInput.files[0];
    const fileName = this.image.name.toLowerCase();

    // вернет true если будет хотя бы одно совпадение
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const imageUrl = URL.createObjectURL(this.image);
      this.uploadedImage.src = imageUrl;
      // добавляет адрес картинки в превью эффектов
      Array.from(this.prewiewImages).forEach((el) => {
        el.style.backgroundImage = `url(${ imageUrl })`;
      });
    }
  }
}
