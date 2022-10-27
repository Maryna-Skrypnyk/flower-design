// const API_KEY = '63469c5f745bd0dbd381d6c4';
// const BASE_URL = `https://${API_KEY}.mockapi.io`;
// let currentPage = 1;

const BASE_URL = 'https://63469c5f745bd0dbd381d6c4.mockapi.io';

export default class ReviewsApiService {
  constructor() {
    this.page = 1;
    this.id = '';
    this.limit = 2;
  }

  async fetchReviews() {
    const response = await fetch(
      `${BASE_URL}/reviews?page=${this.page}&l=${this.limit}`
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

  set limitNum(newLimit) {
    this.limit = newLimit;
  }
}
