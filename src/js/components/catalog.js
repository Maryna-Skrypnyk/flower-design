import catalogTemplate from '../../templates/catalog-card.hbs';
import catalogData from '../../data/catalog.json';
import getRefs from '../refs';
import { makePagination } from './pagination';
import '../../sass/index.scss';

const refs = getRefs();
refs.catalog.insertAdjacentHTML('beforeend', catalogTemplate(catalogData));

// об'єкт налаштувань пагінації catalog

const paginationOptionsCatalog = {
  limit: 6,
  paginationName: 'catalog',
};

const { limit, paginationName } = paginationOptionsCatalog;

// виклик функції пагінації
makePagination(limit, paginationName);
