import getRefs from '../refs';
import { clearBasket } from './basket';
import { toast } from './toast';

const refs = getRefs();

refs.btnFormSubmit.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  toast("Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом.");
  cleanBasket();
}

function cleanBasket() {
  clearBasket();
  refs.formOrder.style.display = 'none';
}
