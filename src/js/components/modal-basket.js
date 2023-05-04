import { displayCart } from './basket';
import getRefs from '../refs';
const refs = getRefs();

const btns = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('.basket-modal-close-button'),
  btnContinueShopping: document.querySelector('.continue-shopping'),
  btnStartShopping: document.querySelector('.start-shopping'),
};

btns.openModalBtn.addEventListener('click', openModal);

export function openModal() {
  displayCart();
  document.body.classList.add('modal-open');
  refs.modalbackdrop.classList.remove('is-hidden');
  btns.closeModalBtn.addEventListener('click', closeModal);
  btns.btnContinueShopping.addEventListener('click', closeModal);
  btns.btnStartShopping.addEventListener('click', closeModal);
  refs.modalbackdrop.addEventListener('click', backdropCloseModal);
  window.addEventListener('keydown', onPressEscape);
}

function closeModal() {
  document.body.classList.remove('modal-open');
  refs.modalbackdrop.classList.add('is-hidden');
  btns.closeModalBtn.removeEventListener('click', closeModal);
  btns.btnContinueShopping.removeEventListener('click', closeModal);
  btns.btnStartShopping.removeEventListener('click', closeModal);
  refs.modalbackdrop.removeEventListener('click', backdropCloseModal);

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

// (() => {
//   const btns = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('.basket-modal-close-button'),
//     modal: document.querySelector('.backdrop'),
//   };

//   btns.openModalBtn.addEventListener('click', openModal);

//   function openModal() {
//     displayCart();
//     btns.modal.classList.remove('is-hidden');
//     window.addEventListener('keydown', onPressEscape);
//     btns.closeModalBtn.addEventListener('click', closeModal);
//     btns.modal.addEventListener('click', backdropCloseModal);
//     document
//       .querySelector('.continue-shopping')
//       .addEventListener('click', closeModal);
//     document.body.classList.add('modal-open');
//   }

//   function closeModal() {
//     document.body.classList.remove('modal-open');
//     btns.closeModalBtn.removeEventListener('click', closeModal);
//     btns.modal.classList.add('is-hidden');
//     btns.modal.removeEventListener('click', closeModal);
//     document
//       .querySelector('.continue-shopping')
//       .removeEventListener('click', closeModal);
//     window.removeEventListener('keydown', onPressEscape);
//   }

//   function onPressEscape(event) {
//     if (event.code === 'Escape') {
//       closeModal();
//     }
//   }

//   function backdropCloseModal(event) {
//     if (event.currentTarget === event.target) {
//       closeModal();
//     }
//   }
// })();
