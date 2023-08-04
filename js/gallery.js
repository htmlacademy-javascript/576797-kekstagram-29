import {renderPictures} from './picture.js';
import {showModal} from './big-picture-modal.js';
import {sortPhotoList} from './sort.js';

const pictures = document.querySelector('.pictures');

function renderGallery(photoList, sortMethod = '') {
  const pictureItems = document.querySelectorAll('.picture');
  // при перерисовке картинок удалям старые если есть
  if (pictureItems.length !== 0) {
    pictureItems.forEach((el) => el.remove());
  }

  const newPhotoList = photoList.slice();
  if (!sortMethod || sortMethod === 'default') {
    renderPictures(newPhotoList);
  } else {
    renderPictures(sortPhotoList(newPhotoList, sortMethod));
  }

  pictures.addEventListener('click', (evt) => {
    const picturesId = evt.target.closest('[data-picture-id]');
    if (!picturesId) {
      return;
    }
    const picture = newPhotoList.find((item) => item.id === Number(picturesId.dataset.pictureId));
    showModal(picture);
  });
}

export {renderGallery};
