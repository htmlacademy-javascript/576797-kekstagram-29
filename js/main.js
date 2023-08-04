import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {renderGallery} from './gallery.js';
import {filterSection, setShowFilter} from './sort.js';
import {editor} from './editor.js';

getData('fetch')
  .then((pictures) => {
    renderGallery(pictures);
    filterSection.classList.remove('img-filters--inactive');
    setShowFilter(debounce((sortMethod) => renderGallery(pictures, sortMethod)));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

editor.init();
