import { displayCart } from './basket';

(() => {
  const btns = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('.basket-modal-close-button'),
    modal: document.querySelector('.backdrop'),
  };

  btns.openModalBtn.addEventListener('click', openModal);

  function openModal() {
    displayCart();
    btns.modal.classList.remove('is-hidden');
    window.addEventListener('keydown', onPressEscape);
    btns.closeModalBtn.addEventListener('click', closeModal);
    btns.modal.addEventListener('click', backdropCloseModal);
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    document.body.classList.remove('modal-open');
    btns.closeModalBtn.removeEventListener('click', closeModal);
    btns.modal.classList.add('is-hidden');
    btns.modal.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', onPressEscape);
  }
  function onPressEscape(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
  function backdropCloseModal(event) {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }
})();
