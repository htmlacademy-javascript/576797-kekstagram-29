import {isEscapeKey} from './util.js';
const commentTemplate = document.querySelector('#modal-comment').content.querySelector('.social__comment');
const modalBigPicture = document.querySelector('.big-picture');

const modal = {
  image: modalBigPicture.querySelector('.big-picture__img img'),
  likes: modalBigPicture.querySelector('.likes-count'),
  comments: modalBigPicture.querySelector('.comments-count'),
  description: modalBigPicture.querySelector('.social__caption'),
  list: modalBigPicture.querySelector('.social__comments')
};

const commentCountField = document.querySelector('.social__comment-count');
const shownComments = document.querySelector('.shown-comments-count');
const refreshButton = document.querySelector('.comments-loader');

const COMMENT_STEP = 5;

/*
* модуль показывает модальное окно, добавляет в него необходимые данные + добавляет комментарии при клике по «Загрузить ещё»
* комментарии отображаются с шагом в 5 штук
* */

class Post {
  constructor(picture) {
    this.picture = picture;
    this.shownCommentsCount = 0;
  }

  addMoreComments () {
    this.shownCommentsCount += COMMENT_STEP;

    if (this.shownCommentsCount > this.picture.comments.length) {
      this.shownCommentsCount = this.picture.comments.length;
      refreshButton.classList.add('hidden');
    }

    this.renderComments();
  }

  renderComments() {
    // удаляем все комментарии
    modal.list.innerHTML = '';
    if (this.picture.comments.length === 0) {
      return;
    }
    const fragment = document.createDocumentFragment();
    //создаем комментарии заново по не больше this.shownCommentsCount
    for (let i = 0; i < this.shownCommentsCount; i++) {
      const newComment = commentTemplate.cloneNode(true);
      const {avatar, name, message} = this.picture.comments[i];
      newComment.querySelector('.social__picture').src = avatar;
      newComment.querySelector('.social__picture').alt = name;
      newComment.querySelector('.social__text').textContent = message;
      fragment.appendChild(newComment);
    }
    modal.list.appendChild(fragment);
    shownComments.textContent = this.shownCommentsCount;
    commentCountField.classList.remove('hidden');
    if (this.shownCommentsCount < this.picture.comments.length) {
      refreshButton.classList.remove('hidden');
    }
  }

  show() {
    modal.image.src = this.picture.url;
    modal.likes.textContent = this.picture.likes;
    modal.comments.textContent = String(this.picture.comments.length);
    modal.description.textContent = this.picture.description;

    if (this.picture.comments.length !== 0) {
      if (COMMENT_STEP > this.picture.comments.length) {
        this.shownCommentsCount = this.picture.comments.length;
      } else {
        this.shownCommentsCount = COMMENT_STEP;
      }
    }

    this.renderComments();
  }
}

class PostView {
  constructor() {
    this.picturesCache = {};
    modalBigPicture.addEventListener('click', (evt) => {
      if (evt.target.matches('.big-picture__cancel')) {
        this.closeModal();
      }
    });
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
  }

  closeModal() {
    modalBigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.closeModal();
    }
  }

  showBackDrop () {
    modalBigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCountField.classList.add('hidden');
    refreshButton.classList.add('hidden');
    document.addEventListener('keydown', this.onDocumentKeydown);
  }

  showModal (picture) {
    // object || undefined
    let pictureModal = this.picturesCache[picture.id];

    this.showBackDrop();

    if (pictureModal) {
      pictureModal.show();
      return;
    }

    pictureModal = new Post(picture);
    pictureModal.show();

    this.picturesCache[picture.id] = pictureModal;

    refreshButton.addEventListener('click', () => pictureModal.addMoreComments());
  }
}
export default PostView;
