import catalogTemplate from '../../templates/catalog-card.hbs';
import catalogData from '../../data/catalog.json';
import getRefs from '../refs';

import '../../sass/index.scss';

const refs = getRefs();

refs.catalog.insertAdjacentHTML('beforeend', catalogTemplate(catalogData));

/////////////////
