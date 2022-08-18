import deliveryTemplate from '../../templates/delivery.hbs';
import deliveryData from '../../data/delivery.json';
import getRefs from '../refs';

import '../../sass/index.scss';

const refs = getRefs();

refs.delivery.insertAdjacentHTML('beforeend', deliveryTemplate(deliveryData));
