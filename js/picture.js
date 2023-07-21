const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const createPicture = ({url, description, comments, likes }) => {
  const pictureTemplate = template.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = url || '';
  pictureTemplate.querySelector('.picture__img').alt = description || '';
  pictureTemplate.querySelector('.picture__comments').textContent = comments.length || '';
  pictureTemplate.querySelector('.picture__likes').textContent = likes || '';
  return pictureTemplate;
};

/**
 * @param pictures {array} - array of objects
 * */
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.appendChild(createPicture(picture));
  });
  pictureBlock.appendChild(fragment);
};

export {renderPictures};
