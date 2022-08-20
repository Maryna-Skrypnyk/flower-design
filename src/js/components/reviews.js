import reviewsTemplate from '../../templates/reviews.hbs';
import getRefs from '../../js/refs';
import dataReviews from '../../data/reviews.json';

const refs = getRefs();

refs.reviews.insertAdjacentHTML('beforeend', reviewsTemplate(dataReviews));
