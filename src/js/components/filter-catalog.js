import getRefs from '../refs';
import ApiService from './service-api';

const refs = getRefs();

const productApiService = new ApiService();
const TYPES = {
  BOUQUETS: 'букет',
  FRESH: 'живі квіти',
  OWN: 'свій букет',
};

refs.galleryList.addEventListener('click', onFilterCatalogByType);

async function onFilterCatalogByType(e) {
  const btnBouquets = e.target.closest('button[data-type="bouquets"]');
  const btnFresh = e.target.closest('button[data-type="fresh"]');
  const btnOwn = e.target.closest('button[data-type="own"]');

  const data = await productApiService.fetchCatalogAll();

  if (btnBouquets) {
    return data.filter(item => item.type === TYPES.BOUQUETS);
  }
  if (btnFresh) {
    return data.filter(item => item.type === TYPES.FRESH);
  }
  if (btnOwn) {
    return data.filter(item => item.type === TYPES.OWN);
  }
}
