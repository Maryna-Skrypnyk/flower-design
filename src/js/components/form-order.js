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
