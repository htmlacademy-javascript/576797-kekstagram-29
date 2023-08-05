import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import Gallery from './gallery.js';
import {filterSection, setShowFilter} from './sort.js';
import Editor from './editor.js';
import Modals from './modals.js';
import MessageModal from './message-modal.js';
import PostView from './post-view.js';

const postView = new PostView;

getData('fetch')
  .then((pictures) => {
    const gallery = new Gallery(pictures, postView);
    gallery.render();
    filterSection.classList.remove('img-filters--inactive');
    setShowFilter(debounce(gallery.render));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

const modals = new Modals();
modals.init();

const messageModal = new MessageModal(modals);

const editor = new Editor(document.querySelector('.img-upload__form'), modals, messageModal);
editor.init();
