import {renderPictures} from './picture.js';
import {showModal} from './big-picture-modal.js';

const pictures = document.querySelector('.pictures');

function renderGallery(photoList) {
  renderPictures(photoList);
  pictures.addEventListener('click', (evt) => {
    const picturesId = evt.target.closest('[data-picture-id]');
    if (!picturesId) {
      return;
    }
    const picture = photoList.find((item) => item.id === Number(picturesId.dataset.pictureId));
    showModal(picture);
  });
}

export {renderGallery};
