import reviewsTemplate from '../../templates/reviews.hbs';
import getRefs from '../../js/refs';
import dataReviews from '../../data/reviews.json';
import { makePagination } from './pagination';

const refs = getRefs();
refs.reviews.insertAdjacentHTML('beforeend', reviewsTemplate(dataReviews));

// об'єкт налаштувань пагінації reviews

const paginationOptionsReviews = {
  limit: 2,
  paginationName: 'reviews',
};

const { limit, paginationName } = paginationOptionsReviews;

// виклик функції пагінації
makePagination(limit, paginationName);
