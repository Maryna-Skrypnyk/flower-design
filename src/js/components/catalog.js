import getRefs from '../refs';
import ApiService from './service-api';
import catalogTemplate from '../../templates/catalog-card.hbs';
import { makeScrollIntoAnchors } from './scroll';
import { hideSpinner, showSpinner } from './spinner';

const arrowLeft = document.getElementById(`prev__button--catalog`),
  arrowRight = document.getElementById(`next__button--catalog`),
  paginationEl = document.getElementById(`pagination-catalog`);

const catalogApiService = new ApiService();

const refs = getRefs();

let currentPage = catalogApiService.page;
let pages = catalogApiService.catalogLimit;
let pageCount;
let pagesSeach = 5;

function renderPagination(totalPages, result) {
  paginationEl.innerHTML = '';
  catalogApiService.resetPage();

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
    button.setAttribute('data-catalog', '#catalog');
    button.className = `page__number--catalog`;
    makeScrollIntoAnchors('catalog');

    if (currentPage === page) {
      button.classList.add('active');
    }

    button.addEventListener('click', function () {
      currentPage = page;

      let currentBtn = document.querySelector(
        '.pages__numbers--catalog button.active'
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
      makeScrollIntoAnchors('catalog');
      currentPage -= 1;

      createPagination(result, paginationEl, pages);
      createListPage(currentPage);
    }
    disableArrowBtn(totalPages);
  }

  function onClickArrowRight() {
    if (currentPage < totalPages) {
      makeScrollIntoAnchors('catalog');
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
renderPaginationCatalog();

function renderPaginationCatalog() {
  catalogApiService
    .fetchCatalogPagination()
    .then(catalog => {
      renderPagination(
        Math.ceil(catalog.length / catalogApiService.catalogLimit),
        catalog
      );
    })
    .catch(error => console.log(error));
}

function createListPage(currentPage) {
  showSpinner();
  catalogApiService.pageNum = currentPage;
  catalogApiService
    .fetchCatalog()
    .then(createCatalogMarkUp)
    .catch(error => console.log('error', error))
    .finally(hideSpinner);
  return;
}

// функція створення розмітки з отриманих даних по шаблону
function createCatalogMarkUp(catalogInfo) {
  refs.catalog.innerHTML = '';
  refs.catalog.insertAdjacentHTML('beforeend', catalogTemplate(catalogInfo));
}
