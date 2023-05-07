import getRefs from '../refs';
import { displayCart } from './basket';
import { toast } from './toast';
import { BASKET_KEYS } from '../../data/data';

const refs = getRefs();

refs.btnFormSubmit.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  toast("Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом.");
  cleanBasket();
}

function cleanBasket() {
  localStorage.removeItem(BASKET_KEYS.ProductsInCart);
  localStorage.removeItem(BASKET_KEYS.CartNumbers);
  localStorage.removeItem(BASKET_KEYS.TotalCost);
  refs.basketQuantity.textContent = 0;
  displayCart();
  refs.formOrder.style.display = 'none';
}
