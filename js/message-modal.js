import {isEscapeKey} from './util.js';

class MessageModal {
  constructor () {
    this.success = document.querySelector('#success').content.querySelector('.success');
    this.error = document.querySelector('#error').content.querySelector('.error');
  }

  /**
   * @param {'success' | 'error'} type
   */
  show (type) {
    if (type === 'success') {
      this.modal = this.success.cloneNode(true);
    } else if (type === 'error') {
      this.modal = this.error.cloneNode(true);
    }

    document.addEventListener('keydown', (evt) => this.onDocumentKeydown(evt), true);
    document.addEventListener('click', (evt) => this.onClose(evt));
    document.body.appendChild(this.modal);
  }

  hide () {
    window.console.log('!!', this.modal);
    this.modal.remove();
    document.removeEventListener('click', (evt) => this.onClose(evt));
    document.removeEventListener('keydown', (evt) => this.onDocumentKeydown(evt));
  }

  onClose (evt) {
    evt.preventDefault();
    if (evt.target.closest('.success__button, .error__button')) {
      this.hide();
    }
    if (!evt.target.closest('.success__inner, .error__inner')) {
      this.hide();
    }
  }

  onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      window.console.log('#', evt.target.matches('.error'));
      // TODO срабатывает ивент с editor
      this.hide();
    }
  }
}

export const messageModal = new MessageModal();


