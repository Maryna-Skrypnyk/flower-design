// // const BASE_URL = 'http://localhost:4040';

// const API_KEY = '63469c5f745bd0dbd381d6c4';
// const BASE_URL = `https://${API_KEY}.mockapi.io`;

// const fetchReviews = async (page = 1) => {
//   try {
//     const response = await fetch(`${BASE_URL}/comments?page=${page}&limit=2`);
//     const reviews = await response.json();
//     return reviews;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addReview = async review => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(review),
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/comments`, options);
//     const newReview = await response.json();
//     return newReview;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeReview = async reviewId => {
//   const url = `${BASE_URL}/comments/${reviewId}`;
//   const options = {
//     method: 'DELETE',
//   };
//   try {
//     const response = await fetch(url, options);
//     const review = await response.json();
//     return review;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updateReviewById = async (update, reviewId) => {
//   const options = {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(update),
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/comments/${reviewId}`, options);
//     const review = await response.json();
//     return review;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchReviewById = async reviewId => {
//   try {
//     const response = await fetch(`${BASE_URL}/comments/${reviewId}`);
//     const review = await response.json();
//     return review;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const reviewsApiService = {
//   fetchReviews,
//   addReview,
//   removeReview,
//   updateReviewById,
//   fetchReviewById,
// };

// export default reviewsApiService;

/////////////////

const API_KEY = '63469c5f745bd0dbd381d6c4';
const BASE_URL = `https://${API_KEY}.mockapi.io`;
// let currentPage = 1;

export default class ReviewsApiService {
  constructor() {
    this.page = 1;
    this.id = '';
  }

  async fetchReviews() {
    const response = await fetch(`${BASE_URL}/comments?page=${this.page}&l=2`);
    const results = await response.json();
    return results;
  }

  async fetchReviewsPagination() {
    try {
      const response = await fetch(`${BASE_URL}/comments?page=${this.page}`);
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
      const response = await fetch(`${BASE_URL}/comments`, options);
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
}
