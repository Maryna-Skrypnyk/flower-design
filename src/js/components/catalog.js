import catalogTemplate from '../../templates/catalog-card.hbs';
import catalogData from '../../data/catalog.json';
import getRefs from '../refs';

import '../../sass/index.scss';

const refs = getRefs();

refs.catalog.insertAdjacentHTML('beforeend', catalogTemplate(catalogData));

/////////////////

const paginationNumbers = document.getElementById('pagination-catalog');
const reviewsItems = refs.catalog.querySelectorAll('.catalog__item');
const nextButton = document.getElementById('next__button--catalog');
const prevButton = document.getElementById('prev__button--catalog');

const paginationLimit = 6;
const pageCount = Math.ceil(reviewsItems.length / paginationLimit);
let currentPage = 1;

const disableButton = button => {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
};

const enableButton = button => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll('.page__number--catalog').forEach(button => {
    button.classList.remove('active');
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex == currentPage) {
      button.classList.add('active');
    }
  });
};

const appendPageNumber = index => {
  const pageNumber = document.createElement('button');
  pageNumber.setAttribute('data-catalog', '#catalog');
  pageNumber.setAttribute('page-index', index);
  //   pageNumber.innerHTML = index;
  pageNumber.setAttribute('aria-label', 'Page ' + index);
  pageNumber.className = 'page__number--catalog';
  paginationNumbers.appendChild(pageNumber);

  makeAnchors();
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = pageNum => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  reviewsItems.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden');
    }
  });
};

window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll('.page__number--catalog').forEach(button => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

// плавна прокрутка до початку кожної сторінки каталогу по якорю

const makeAnchors = () => {
  const anchors = document.querySelectorAll('button[data-catalog*="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const blockID = anchor.getAttribute('data-catalog');
      document.querySelector(`${blockID}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};

//////////////////////
