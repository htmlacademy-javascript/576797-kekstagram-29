import {isEscapeKey, isEnterKey} from './util.js';
const miniatures = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function showModal() {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

miniatures.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    showModal();
  }
});

modal.addEventListener('click', (evt) => {
  if (evt.target.matches('.big-picture__cancel')) {
    closeModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showModal();
  }
});


