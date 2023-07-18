const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const createPicture = (data) => {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = template.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = data.url || '';
  pictureTemplate.querySelector('.picture__img').alt = data.description || '';
  pictureTemplate.querySelector('.picture__comments').textContent = data.comments.length || '';
  pictureTemplate.querySelector('.picture__likes').textContent = data.likes || '';
  fragment.appendChild(pictureTemplate);
  pictureBlock.appendChild(fragment);
  return pictureBlock;
};

export {createPicture};
