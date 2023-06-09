import getRefs from '../refs';
import { validateForm } from './validator-form-order';
import ApiService from './service-api';
import { clearBasket } from './basket';
import { toast } from './toast';
import { closeModal } from './modal-basket';
import { hideSpinner, showSpinner } from './spinner';

const orderApiService = new ApiService();

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
  showSpinner();
  try {
    await orderApiService.addDataFormOrder(newOrder);
    toast(
      "Дякуємо за замовлення. Менеджер зв'яжеться з Вами найближчим часом."
    );
  } catch (error) {
    console.log(error);
    toast('Щось пішло не так. Спробуйте оформити замовлення ще раз.');
  } finally {
    hideSpinner();
  }
  // const jsonString = JSON.stringify(newOrder);
  // console.log('DataFormJSON ', jsonString);
}
