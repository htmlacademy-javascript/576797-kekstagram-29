import '/vendor/pristine/pristine.min.js';
import { isEscapeKey } from './util.js';
import { isHashtagValid, isRepeatedHashTags, isHashTagLimitExceeded } from './validators.js';

class Editor {

  constructor (form) {
    this.form = form;
    this.backDrop = form.querySelector('.img-upload__overlay');
    this.closeButton = form.querySelector('.img-upload__cancel');
    this.uploadInput = form.querySelector('.img-upload__input');
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
      this.showBackdrop();
      document.addEventListener('keydown', (evt) => this.onDocumentKeydown(evt));
    } else {
      this.closeBackDrop();
      document.removeEventListener('keydown', (evt) => this.onDocumentKeydown(evt));
    }
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
