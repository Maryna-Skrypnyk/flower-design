const API_KEY = '63469c5f745bd0dbd381d6c4';
const BASE_URL = `https://${API_KEY}.mockapi.io`;

export default class ApiService {
  constructor() {
    this.page = 1;
    this.catalogLimit = 6;
    this.reviewsLimit = 2;
  }

  async fetchReviews() {
    const response = await fetch(
      `${BASE_URL}/reviews?sortBy=dateISO&order=desc&page=${this.page}&l=${this.reviewsLimit}`
    );
    const results = await response.json();
    return results;
  }

  async fetchReviewsPagination() {
    try {
      const response = await fetch(`${BASE_URL}/reviews?page=${this.page}`);
      const results = await response.json();
      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async addReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    };

    try {
      const response = await fetch(`${BASE_URL}/reviews`, options);
      const results = await response.json();
      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async fetchCatalog() {
    const response = await fetch(
      `${BASE_URL}/catalog?page=${this.page}&l=${this.catalogLimit}`
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

  async fetchCatalogAll() {
    try {
      const response = await fetch(`${BASE_URL}/catalog`);
      const results = await response.json();
      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async getFullProductInfo(id) {
    try {
      const response = await fetch(`${BASE_URL}/catalog/${id}`);
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return console.log(error);
    }
  }

  // getFullProductInfo(id) {
  //   return fetch(`${BASE_URL}/catalog/${id}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }

  async addDataFormOrder(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };

    try {
      const response = await fetch(`${BASE_URL}/orders`, options);
      const results = await response.json();
      return results;
    } catch (error) {
      return console.log(error);
    }
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
}
