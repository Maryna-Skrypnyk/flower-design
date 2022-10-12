import reviewsTemplate from '../../templates/reviews.hbs';
import getRefs from '../../js/refs';
import reviewsApiService from './service-api';
// import ReviewsApiService from './service-api';
import { toast } from './toast';
import throttle from 'lodash.throttle';
const LOCAL_STORAGE_KEY_REVIEW = 'reviewKey';
// import dataReviews from '../../data/reviews.json'; // якщо не використовуємо сервер
import { makePagination } from './pagination';

import { makeScrollIntoAnchors } from './scroll';

const refs = getRefs();
// refs.reviews.insertAdjacentHTML('beforeend', reviewsTemplate(dataReviews)); // якщо дані беремо з власного data/reviews.json

// // об'єкт налаштувань пагінації reviews
// const paginationOptionsReviews = {
//   limit: 2,
//   paginationName: 'reviews',
// };
// const { limit, paginationName } = paginationOptionsReviews; // деструктуризація об'єкту
// // // виклик функції пагінації
// makePagination(limit, paginationName); // якщо дані беремо з власного data/reviews.json

//////////////

refs.formReviews.addEventListener('submit', onSubmitReview);
refs.formReviews.addEventListener('input', throttle(onInputChangeReview, 200));

fetchReviewsMarkup();
makePagination(2, 'reviews');
populateInput(); // запис інформації з локального сховища в поля вводу форми

// робимо callback-функцію для додавання розмітки на основі отриманих даних з сервера
function createReviewsMarkUp(reviewsInfo) {
  refs.reviews.insertAdjacentHTML('beforeend', reviewsTemplate(reviewsInfo));
  // makePagination(limit, paginationName);
}

async function fetchReviewsMarkup() {
  try {
    const reviewsInfo = await reviewsApiService.fetchReviews();
    createReviewsMarkUp(reviewsInfo);
  } catch (error) {
    console.log(error);
  }
}

async function addNewReviewMarkup(author, text) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatDay = String(day);
  const formatMonth = month < 10 ? `0${String(month)}` : String(month);
  const formatYear = String(year).slice(-2);
  const formatDate = `${formatDay}.${formatMonth}.${formatYear}`;

  const defaultPhoto =
    'https://cdn2.iconfinder.com/data/icons/avatar-profile/449/avatar_user_default_contact_profile_male-1024.png';

  const newReview = {
    photo: defaultPhoto,
    author,
    // author: refs.formReviews.name.value,
    text,
    // text: refs.formReviews.message.value,
    date: formatDate,
  };

  const reviewInfo = await reviewsApiService.addReview(newReview);
  createReviewsMarkUp([reviewInfo]);
}

// відправка форми reviews після додавання нового review
function onSubmitReview(e) {
  e.preventDefault();
  const formData = e.currentTarget.elements;

  if (
    formData.name.value.trim() === '' &&
    formData.message.value.trim() === ''
  ) {
    return toast("Введіть ім'я та повідомлення");
  }
  if (formData.name.value.trim() === '') {
    return toast("Введіть ім'я");
  }
  if (formData.message.value.trim() === '') {
    return toast('Введіть повідомлення');
  }

  addNewReviewMarkup(formData.name.value, formData.message.value);
  makePagination(2, 'reviews');

  formData.name.value = '';
  formData.message.value = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY_REVIEW); // очищення локального сховища за ключем
  makeScrollIntoAnchors('reviews');
}

// перевірка наявності збереження інформації з полів форми в локальному сховищі за ключем та запис інформації звідти
function populateInput() {
  const savedInputObj = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_REVIEW)
  );
  if (savedInputObj) {
    refs.formReviews.name.value = savedInputObj.name || '';
    refs.formReviews.message.value = savedInputObj.message || '';
  }
}

const dataForm = {}; // створення об'єкту для збереження в локальне сховище
// заповнення об'єкту локального сховища даними
function onInputChangeReview(e) {
  dataForm[e.target.name] = e.target.value;
  if (refs.formReviews.name.value !== '') {
    dataForm.name = refs.formReviews.name.value;
  }
  if (refs.formReviews.message.value !== '') {
    dataForm.message = refs.formReviews.message.value;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_REVIEW, JSON.stringify(dataForm));
}
