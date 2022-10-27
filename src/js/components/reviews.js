import getRefs from '../refs';
import ReviewsApiService from './reviews-api';
import reviewsTemplate from '../../templates/reviews.hbs';
import { makeScrollIntoAnchors } from './scroll';
import { hideSpinner, showSpinner } from './spinner';
import { toast } from './toast';
import throttle from 'lodash.throttle';
const LOCAL_STORAGE_KEY_REVIEW = 'reviewKey';

const arrowLeft = document.getElementById(`prev__button--reviews`),
  arrowRight = document.getElementById(`next__button--reviews`),
  paginationEl = document.getElementById(`pagination-reviews`),
  paginationPages = document.querySelector('.pagination__pages--reviews');

const reviewsApiService = new ReviewsApiService();

const refs = getRefs();

let currentPage = reviewsApiService.page;
let pages = reviewsApiService.limit;
// let pages = 2;
let pageCount;
let pagesSeach = 5;

// function resetCurrentPage() {
//   // currentPage = 1;
//   reviewsApiService.resetPage();
// }

function renderPagination(totalPages, result) {
  paginationEl.innerHTML = '';
  reviewsApiService.resetPage();
  // resetCurrentPage();

  arrowLeft.onclick = onClickArrowLeft;
  arrowRight.onclick = onClickArrowRight;
  arrowLeft.removeEventListener('click', onClickArrowLeft);
  arrowRight.removeEventListener('click', onClickArrowRight);

  function createPagination(items, container, pages) {
    container.innerHTML = '';
    pageCount = totalPages;

    let maxLeftPage = currentPage - Math.floor(pagesSeach / 2);
    let maxRightPage = currentPage + Math.floor(pagesSeach / 2);

    if (maxLeftPage < 1) {
      maxLeftPage = 1;
      maxRightPage = pagesSeach;
    }

    if (maxRightPage > totalPages) {
      maxLeftPage = totalPages - (pagesSeach - 1);
      if (maxLeftPage < 1) {
        maxLeftPage = 1;
      }
      maxRightPage = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (maxLeftPage !== 1 && i == 1) {
        let btn = paginationButton(i, items);
        container.appendChild(btn);
      }

      if (maxRightPage !== totalPages && i == totalPages) {
        let btn = paginationButton(i, items);
        container.appendChild(btn);
      }

      if (i >= maxLeftPage && i <= maxRightPage) {
        let btn = paginationButton(i, items);
        container.appendChild(btn);
      }

      if (
        totalPages > 6 &&
        i == 1 &&
        currentPage !== 1 &&
        currentPage !== 2 &&
        currentPage !== 3 &&
        currentPage !== 4
      ) {
        const dotsEl = addDotsContainer();
        container.insertBefore(dotsEl, container[container.length - 2]);
      }

      if (
        pageCount >= 7 &&
        i == pageCount - 1 &&
        currentPage !== pageCount &&
        currentPage !== pageCount - 2 &&
        currentPage !== pageCount - 1 &&
        currentPage !== pageCount - 3
      ) {
        const dotsEl = addDotsContainer();
        container.insertBefore(dotsEl, container[1]);
      }
    }
  }

  function addDotsContainer() {
    const dots = document.createElement('div');
    dots.classList.add('dots');
    dots.innerText = '...';
    dots.style.color = '#ffc2c7';
    return dots;
  }

  function paginationButton(page, items) {
    let button = document.createElement('button');
    // button.innerText = page;
    button.setAttribute('aria-label', 'Page ' + page);
    button.setAttribute('data-reviews', '#reviews');
    button.className = `page__number--reviews`;
    makeScrollIntoAnchors('reviews');

    if (currentPage === page) {
      button.classList.add('active');
    }

    button.addEventListener('click', function () {
      currentPage = page;

      let currentBtn = document.querySelector(
        '.pages__numbers--reviews button.active'
      );
      currentBtn.addEventListener('click', createListPage(currentPage));
      // arrowLeft.addEventListener('click', createListPage(currentPage - 1));
      // arrowRight.addEventListener('click', createListPage(currentPage));

      currentBtn.classList.remove('active');
      button.classList.add('active');
      createPagination(result, paginationEl, pages);
    });

    return button;
  }

  function onClickArrowLeft() {
    if (currentPage > 1) {
      makeScrollIntoAnchors('reviews');
      currentPage -= 1;

      createPagination(result, paginationEl, pages);
      createListPage(currentPage);
    }
    disableArrowBtn(totalPages);
  }

  function onClickArrowRight() {
    if (currentPage < totalPages) {
      makeScrollIntoAnchors('reviews');
      currentPage += 1;

      createPagination(result, paginationEl, pages);
      createListPage(currentPage);
    }
    disableArrowBtn(totalPages);
  }

  createPagination(result, paginationEl, pages);
  disableArrowBtn(totalPages);
}

paginationEl.addEventListener('click', disableArrowBtnAfterPageClick);

function disableArrowBtnAfterPageClick(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  } else {
    disableArrowBtn(pageCount);
  }
}

// неактивні стрілки на першій і останній сторінці
function disableArrowBtn(totalPages) {
  if (currentPage === 1) {
    arrowLeft.classList.add('disabled');
  } else {
    arrowLeft.classList.remove('disabled');
  }
  if (currentPage === totalPages) {
    arrowRight.classList.add('disabled');
  } else {
    arrowRight.classList.remove('disabled');
  }
}

// перший рендер першої сторінки
createListPage(currentPage);
renderPaginationReviews();

function renderPaginationReviews() {
  reviewsApiService
    .fetchReviewsPagination()
    .then(comments => {
      renderPagination(
        Math.ceil(comments.length / reviewsApiService.limit),
        comments
      );
    })
    .catch(error => console.log(error));
}

function createListPage(currentPage) {
  showSpinner();
  reviewsApiService.page = currentPage;
  if (currentPage == 1) {
    reviewsApiService
      .fetchReviews()
      .then(createReviewsMarkUp)
      .catch(error => console.log('error', error))
      .finally(hideSpinner);
    return;
  }

  if (currentPage > 1) {
    reviewsApiService
      .fetchReviews()
      .then(createReviewsMarkUp)
      .catch(error => console.log('error', error))
      .finally(hideSpinner);
  }
}

// функція створення розмітки з отриманих даних по шаблону
function createReviewsMarkUp(reviewsInfo) {
  refs.reviews.innerHTML = '';
  refs.reviews.insertAdjacentHTML('beforeend', reviewsTemplate(reviewsInfo));
}

// робота з додаванням review через форму і POST-запит
refs.formReviews.addEventListener('submit', onSubmitReview);
refs.formReviews.addEventListener('input', throttle(onInputChangeReview, 200));

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
    text,
    date: formatDate,
  };

  showSpinner();
  try {
    const reviewInfo = await reviewsApiService.addReview(newReview);
    createListPage(currentPage);
    renderPaginationReviews();
    createReviewsMarkUp([reviewInfo]);
  } catch (error) {
    console.log(error);
  } finally {
    hideSpinner();
  }
}

// відправка форми reviews після додавання нового review
function onSubmitReview(e) {
  e.preventDefault();
  const formData = e.currentTarget.elements;

  if (
    formData.name.value.trim() === '' &&
    formData.message.value.trim() === ''
  ) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_REVIEW);
    return toast("Введіть ім'я та текст повідомлення");
  }
  if (formData.name.value.trim() === '') {
    return toast("Введіть ім'я");
  }
  if (formData.message.value.trim() === '') {
    return toast('Введіть текст повідомлення');
  }

  addNewReviewMarkup(formData.name.value, formData.message.value);

  formData.name.value = '';
  formData.message.value = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY_REVIEW); // очищення локального сховища за ключем
  makeScrollIntoAnchors('reviews');
}

populateInput();

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
