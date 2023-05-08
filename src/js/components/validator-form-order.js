import validator from 'validator';
import getRefs from '../refs';
import { toast } from './toast';

const refs = getRefs();

export function validateForm() {
  let userName = refs.formBasket.querySelector('input[name="user-name"]');
  let userPhone = refs.formBasket.querySelector('input[name="tel"]');
  let userEmail = refs.formBasket.querySelector('input[name="mail"]');
  let userAgree = refs.formBasket.querySelector('input[name="user-agreement"]');

  const errorMessageFormat = name => {
    toast(
      `Введіть значення поля "${name.previousElementSibling.textContent}" у вірному форматі`
    );
  };

  const errorMessage = name => {
    toast(
      `Поле "${name.previousElementSibling.textContent}" обов'язкове для заповнення`
    );
  };

  if (
    validator.isEmpty(userEmail.value) &&
    validator.isEmpty(userPhone.value) &&
    validator.isEmpty(userName.value) &&
    !userAgree.checked
  ) {
    toast(
      `Поля "${userName.previousElementSibling.textContent}", "${userPhone.previousElementSibling.textContent}", "${userEmail.previousElementSibling.textContent}" обов'язкові для заповнення`
    );
    return false;
  }

  if (validator.isEmpty(userName.value)) {
    errorMessage(userName);
    return false;
  }

  if (!validator.isLength(userName.value, { min: 3, max: 12 })) {
    toast(
      `В поле "${userName.previousElementSibling.textContent}" введіть кількість символів від 3 до 12`
    );
    return false;
  }

  if (validator.isEmpty(userPhone.value)) {
    errorMessage(userPhone);
    return false;
  }

  if (
    !validator.matches(
      userPhone.value,
      /^(\+38|38|8)?[\s-.]?\d{3}[\s-.]?\d{2}[\s-.]?\d{2}[\s-.]?\d{3}$/
    )
  ) {
    errorMessageFormat(userPhone);
    return false;
  }

  if (validator.isEmpty(userEmail.value)) {
    errorMessage(userEmail);
    return false;
  }

  if (!validator.isEmail(userEmail.value)) {
    errorMessageFormat(userEmail);
    return false;
  }

  if (!userAgree.checked) {
    toast(
      `Прийняття умов договору є обов'язковим для підтвердження замовлення`
    );
    return false;
  }
}

/* Введення в поле номеру телефона з включеним початковим значенням */
refs.formBasket
  .querySelector('input[name="tel"]')
  .addEventListener('input', e => {
    const input = e.target;
    if (input.value.length < 4) {
      input.value = '+38';
      input.style.color = '#a9bfe4';
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });

/* Заборона видаляти початкове значення номеру телефона при фокусі в полі введення */
refs.formBasket
  .querySelector('input[name="tel"]')
  .addEventListener('focus', e => {
    e.target.removeAttribute('readonly');
    e.target.style.color = '#212121';
  });
