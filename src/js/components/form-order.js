import getRefs from '../refs';
import { validateForm } from './validator-form-order';
import ApiService from './service-api';
import { clearBasket } from './basket';
import { toast } from './toast';
import { closeModal } from './modal-basket';

const reviewsApiService = new ApiService();

const refs = getRefs();

/* Прослуховувач і обробник на подію відправки форми через натискання кнопки з типом submit у формі */
refs.btnFormSubmit.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  if (validateForm() === false) {
    return;
  } else {
    const form = refs.formBasket;

    createOrder();

    toast(
      "Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом."
    );

    form.reset();
    closeModal();
    clearBasket();
  }
}

async function createOrder() {
  const form = refs.formBasket;
  const formData = new FormData(form);
  const newOrder = {};
  formData.forEach((el, i) => {
    newOrder[i] = el;
  });
  try {
    await reviewsApiService.addDataFormOrder(newOrder);
  } catch (error) {
    console.log(error);
  }
  // const jsonString = JSON.stringify(newOrder);
  // console.log('FORMJson ', jsonString);
}
