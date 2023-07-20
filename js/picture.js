const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

const createPost = ({url, description, comments, likes }) => {
  const pictureTemplate = template.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = url || '';
  pictureTemplate.querySelector('.picture__img').alt = description || '';
  pictureTemplate.querySelector('.picture__comments').textContent = comments.length || '';
  pictureTemplate.querySelector('.picture__likes').textContent = likes || '';
  return pictureTemplate;
};

/**
 * @param picturesData {array} - array of objects
 * */
const addUserPhotoPosts = (picturesData) => {
  const pictures = picturesData;
  const fragment = document.createDocumentFragment();
  pictures.forEach((postData) => {
    fragment.appendChild(createPost(postData));
  });
  pictureBlock.appendChild(fragment);
};

export {addUserPhotoPosts};
