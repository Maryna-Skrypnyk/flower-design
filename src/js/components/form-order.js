import getRefs from '../refs';
import { validateForm } from './validator-form-order';
import { clearBasket } from './basket';
import { toast } from './toast';
import { closeModal } from './modal-basket';

const refs = getRefs();

/* Прослуховувач і обробник на подію відправки форми через натискання кнопки з типом submit у формі */
refs.btnFormSubmit.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  if (validateForm() === false) {
    return;
  } else {
    const form = refs.formBasket;
    toast(
      "Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом."
    );
    form.reset();
    closeModal();
    clearBasket();
  }
}

// /* Введення в поле номеру телефона з включеним початковим значенням */
// refs.formBasket
//   .querySelector('input[name="tel"]')
//   .addEventListener('input', e => {
//     const input = e.target;
//     if (input.value.length < 4) {
//       input.value = '+38';
//       input.setSelectionRange(input.value.length, input.value.length);
//     }
//   });

// /* Заборона видаляти початкове значення номеру телефона при фокусі в полі введення */
// refs.formBasket
//   .querySelector('input[name="tel"]')
//   .addEventListener('focus', e => {
//     e.target.removeAttribute('readonly');
//   });
