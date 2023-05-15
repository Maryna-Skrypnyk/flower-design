import validator from 'validator';
import getRefs from '../refs';
import { toast } from './toast';

const refs = getRefs();

let userName = refs.formBasket.querySelector('input[name="user-name"]');
let userPhone = refs.formBasket.querySelector('input[name="tel"]');
let userEmail = refs.formBasket.querySelector('input[name="mail"]');
let userAgree = refs.formBasket.querySelector('input[name="user-agreement"]');

let userCity = refs.formBasket.querySelector('input[name="city"]');
let userStreet = refs.formBasket.querySelector('input[name="street"]');
let userHouse = refs.formBasket.querySelector('input[name="house"]');
let userCorps = refs.formBasket.querySelector('input[name="corps"]');
let userApartment = refs.formBasket.querySelector('input[name="apartment"]');

/* Функції для відображення помилок введення даних у формі */
const errorMessageFormat = name => {
  name.style.color = 'tomato';
  const labelContent = removeAsterisk(name);
  toast(`Введіть значення поля "${labelContent}" у вірному форматі`);
};

const errorMessage = name => {
  const labelContent = removeAsterisk(name);
  toast(`Поле "${labelContent}" обов'язкове для заповнення`);
};

const errorMessageQuantityChars = (name, min, max) => {
  const labelContent = removeAsterisk(name);
  toast(
    `В поле "${labelContent}" введіть кількість символів від ${min} до ${max}`
  );
};

const errorMessageAgree = () => {
  toast(`Прийняття умов договору є обов'язковим для підтвердження замовлення`);
};

const removeAsterisk = name => {
  return name.previousElementSibling.textContent
    .split('')
    .slice(0, -1)
    .join('');
};

export function validateForm() {
  if (validator.isEmpty(userName.value)) {
    errorMessage(userName);
    return false;
  }

  if (!validator.isLength(userName.value, { min: 3, max: 22 })) {
    userName.style.color = 'tomato';
    errorMessageQuantityChars(userName, 3, 22);
    return false;
  }

  if (validator.isEmpty(userPhone.value)) {
    errorMessage(userPhone);
    return false;
  }

  if (
    !validator.matches(
      userPhone.value,
      /^(\+38|38|8)\s?0\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/
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

  if (
    validator.isEmpty(userCity.value) ||
    validator.isEmpty(userStreet.value) ||
    validator.isEmpty(userHouse.value) ||
    validator.isEmpty(userApartment.value)
  ) {
    errorMessage(userCity);
    return false;
  }

  if (!userAgree.checked) {
    errorMessageAgree();
    return false;
  }
}

/* Введення в поле номеру телефона з включеним початковим значенням */
let selectionStart;

userPhone.addEventListener('input', e => {
  selectionStart = e.target.selectionStart;
  if (e.target.value.length < 4) {
    e.target.value = '+38';
    e.target.setSelectionRange(selectionStart, selectionStart);
  }
});

/* Заборона видаляти початкове значення номеру телефона та дозволяємо продовжити написання при фокусі в полі введення */
userPhone.addEventListener('focus', e => {
  // selectionStart = e.target.selectionStart;
  e.target.setSelectionRange(3, 3);
  e.target.removeAttribute('readonly');
});

/* При натисненні клавіші BackSpace і при початковому курсорі після 3-х символів, виходимо */
userPhone.addEventListener('keydown', function (e) {
  if (e.keyCode === 8 && e.target.selectionStart < 4) {
    e.preventDefault();
    return false;
  }
});

/* На всі поля форми при певних умовах змінюємо колір фону при виході з поля */
refs.formBasket.querySelectorAll('input').forEach(item => {
  item.addEventListener('blur', e => {
    if (
      (e.target.value.length >= 3 && e.target.name === 'user-name') ||
      (e.target.value.length >= 13 && e.target.name === 'tel') ||
      (e.target.value.length >= 5 && e.target.name === 'mail') ||
      (e.target.value.length >= 1 && e.target.name === 'city') ||
      (e.target.value.length >= 1 && e.target.name === 'street') ||
      (e.target.value.length >= 1 && e.target.name === 'house') ||
      (e.target.value.length >= 1 && e.target.name === 'corps') ||
      (e.target.value.length >= 1 && e.target.name === 'apartment')
    ) {
      e.target.style.backgroundColor = '#a9bfe44d';
    } else {
      e.target.style.backgroundColor = '#fff';
    }
  });
});

/* На всіх полях форми змінюємо колір фону і тексту при фокусуванні в полі */
refs.formBasket.querySelectorAll('input').forEach(item => {
  item.addEventListener('focus', e => {
    e.target.style.color = '#212121';
    e.target.style.backgroundColor = '#a9bfe44d';
  });
});
