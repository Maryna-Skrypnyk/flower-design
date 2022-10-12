import { makeScrollIntoAnchors } from './scroll';

export const makePagination = (limit, paginationName) => {
  // вибір об'єктів пагінації в DOM по селектору або ID (id та селектори повинні бути створені за аналогією для повторног використання однакової пагінації в різних місцях)
  const paginationItems = document.querySelectorAll(`.${paginationName}__item`);
  const paginationNumbers = document.getElementById(
    `pagination-${paginationName}`
  );
  const nextButton = document.getElementById(`next__button--${paginationName}`);
  const prevButton = document.getElementById(`prev__button--${paginationName}`);
  // встановлення кількості елементів на сторінці та кількості сторінок (елементів пагінації)
  const paginationLimit = limit;
  const pageCount = Math.ceil(paginationItems.length / paginationLimit);
  let currentPage = 1;

  // перемикач включення кнопки (вимкнено)
  const disableButton = button => {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
  };

  // перемикач включення кнопки (ввімкнено)
  const enableButton = button => {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  };

  // перемикач активності стрілочних кнопок при досягненні першого або останнього елемента пагінації
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

  // перемикач поточної активності елементів навігації
  const handleActivePageNumber = () => {
    document
      .querySelectorAll(`.page__number--${paginationName}`)
      .forEach(button => {
        button.classList.remove('active');
        const pageIndex = Number(button.getAttribute('page-index'));
        if (pageIndex == currentPage) {
          button.classList.add('active');
        }
      });
  };

  // створення елементів навігації (знаходяться між кнопками-стрілками)
  const appendPageNumber = index => {
    const pageNumber = document.createElement('button');
    pageNumber.setAttribute(`data-${paginationName}`, `#${paginationName}`);
    pageNumber.setAttribute('page-index', index);
    //   pageNumber.innerHTML = index;
    pageNumber.setAttribute('aria-label', 'Page ' + index);
    pageNumber.className = `page__number--${paginationName}`;
    paginationNumbers.appendChild(pageNumber);

    makeScrollIntoAnchors(paginationName); // прокрутка до початку списку на кожній сторінці пагінації
  };

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  // налаштування поточної сторінки пагінації (активність, включення\відключення, приховання неактивних сторінок)
  const setCurrentPage = pageNum => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    paginationItems.forEach((item, index) => {
      item.classList.add('hidden');
      if (index >= prevRange && index < currRange) {
        item.classList.remove('hidden');
      }
    });
  };

  // завантаження сторінки по кліку на елементи пагінації, в т.ч. кнопок-стрілок
  window.addEventListener('load', () => {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener('click', () => {
      setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
      setCurrentPage(currentPage + 1);
    });

    document
      .querySelectorAll(`.page__number--${paginationName}`)
      .forEach(button => {
        const pageIndex = Number(button.getAttribute('page-index'));

        if (pageIndex) {
          button.addEventListener('click', () => {
            setCurrentPage(pageIndex);
          });
        }
      });
  });
};
