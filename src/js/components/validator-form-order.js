import validator from 'validator';
import getRefs from '../refs';
import { toast } from './toast';

const refs = getRefs();

let userName = refs.formBasket.querySelector('input[name="user-name"]');
let userPhone = refs.formBasket.querySelector('input[name="tel"]');
let userEmail = refs.formBasket.querySelector('input[name="mail"]');
let userAgree = refs.formBasket.querySelector('input[name="user-agreement"]');

export function validateForm() {
  const errorMessageFormat = name => {
    name.style.color = 'tomato';
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

  if (!validator.isLength(userName.value, { min: 3, max: 22 })) {
    userName.style.color = 'tomato';
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

let selectionStart;

userPhone.addEventListener('input', e => {
  selectionStart = e.target.selectionStart;
  if (e.target.value.length < 4) {
    e.target.value = '+38';
    e.target.style.color = '#a9bfe4';
    e.target.setSelectionRange(selectionStart, selectionStart);
  }
});

/* Заборона видаляти початкове значення номеру телефона при фокусі в полі введення */
userPhone.addEventListener('focus', e => {
  selectionStart = e.target.selectionStart;
  e.target.removeAttribute('readonly');
});

userPhone.addEventListener('keydown', function (e) {
  if (e.keyCode === 8 && e.target.selectionStart < 4) {
    e.preventDefault();
    return false;
  }
});

//
refs.formBasket.querySelectorAll('input').forEach(item => {
  item.addEventListener('blur', e => {
    e.target.style.color = '#a9bfe4';
  });
});

refs.formBasket.querySelectorAll('input').forEach(item => {
  item.addEventListener('focus', e => {
    e.target.style.color = '#212121';
  });
});
