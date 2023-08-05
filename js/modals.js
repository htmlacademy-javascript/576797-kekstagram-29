import {isEscapeKey} from './util.js';

export default class Modals {
  showed = [];

  add(modal) {
    this.showed.push(modal);
  }

  remove(modal) {
    this.showed = this.showed.filter((item) => item !== modal); // TODO работает только пока модалки синглтоны
  }

  onKeyDown(evt) {
    if (this.showed.length === 0) {
      return;
    }

    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    if (isEscapeKey(evt)) {
      const modal = this.showed.pop();

      if (!modal) {
        return;
      }

      modal.hide();
    }
  }

  init() {
    document.addEventListener('keydown', (evt) => this.onKeyDown(evt), true);
  }
}

