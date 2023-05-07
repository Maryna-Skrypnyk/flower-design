import getRefs from '../refs';
import { clearBasket } from './basket';
import { toast } from './toast';
import { closeModal } from './modal-basket';

const refs = getRefs();

refs.btnFormSubmit.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  const form = refs.formBasket;
  e.preventDefault();
  toast("Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом.");
  form.reset();
  closeModal();
  clearBasket();
  //   refs.formOrder.style.display = 'none';
}
