import {sortPhotoList} from './sort.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

export default class Gallery {
  constructor(photoList, postView) {
    this.photoList = photoList;
    this.originalphotoList = photoList;
    this.postView = postView;
    pictures.addEventListener('click', (evt) => {
      const picturesId = evt.target.closest('[data-picture-id]');
      if (!picturesId) {
        return;
      }
      const picture = this.photoList.find((item) => item.id === Number(picturesId.dataset.pictureId));
      this.postView.showModal(picture);
    });
    this.render = this.render.bind(this);
  }

  createPicture ({id, url, description, comments, likes}) {
    const pictureTemplate = template.cloneNode(true);
    pictureTemplate.dataset.pictureId = id || '';
    pictureTemplate.querySelector('.picture__img').src = url || '';
    pictureTemplate.querySelector('.picture__img').alt = description || '';
    pictureTemplate.querySelector('.picture__comments').textContent = comments.length || '';
    pictureTemplate.querySelector('.picture__likes').textContent = likes || '';
    return pictureTemplate;
  }

  /**
   * @param pictures {array} - array of objects
   * */
  renderPictures (photoList) {
    const fragment = document.createDocumentFragment();
    photoList.forEach((picture) => {
      fragment.appendChild(this.createPicture(picture));
    });
    pictureBlock.appendChild(fragment);
  }

  render(sortMethod = '') {
    const pictureItems = document.querySelectorAll('.picture');
    // при перерисовке картинок удалям старые если есть
    if (pictureItems.length !== 0) {
      pictureItems.forEach((el) => el.remove());
    }

    const newPhotoList = this.photoList.slice();
    if (!sortMethod || sortMethod === 'default') {
      this.renderPictures(newPhotoList);
    } else {
      this.renderPictures(sortPhotoList(newPhotoList, sortMethod));
    }
  }
}
