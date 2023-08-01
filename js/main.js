import {getData} from './api.js';
import {showAlert} from './util.js';
import {renderGallery} from './gallery.js';
import './editor.js';

getData('fetch')
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
