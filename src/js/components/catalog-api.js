// const API_KEY = '63469c5f745bd0dbd381d6c4';
// const BASE_URL = `https://${API_KEY}.mockapi.io`;
// let currentPage = 1;

const BASE_URL = 'https://63469c5f745bd0dbd381d6c4.mockapi.io';

export default class CatalogApiService {
  constructor() {
    this.page = 1;
    this.id = '';
    this.limit = 6;
  }

  async fetchCatalog() {
    const response = await fetch(
      `${BASE_URL}/catalog?page=${this.page}&l=${this.limit}`
    );
    const results = await response.json();
    return results;
  }

  async fetchCatalogPagination() {
    try {
      const response = await fetch(`${BASE_URL}/catalog?page=${this.page}`);
      const results = await response.json();
      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

  get limitNum() {
    return this.limit;
  }
}
