const BASE_URL = 'http://localhost:4040';

// const fetchReviews = (page = 1, limit = 2) => {
//   return fetch(`${BASE_URL}/comments?_page=${page}&_limit=${limit}`).then(res =>
//     res.json()
//   );
// };

// const fetchReviews = () =>
//   fetch(`${BASE_URL}/comments`)
//     .then(res => res.json())
//     // .then(({ comments }) => comments)
//     .catch(error => console.log(error));

const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/comments`);
  const reviews = await response.json();
  return reviews;
};

const addReview = async review => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  };

  const response = await fetch(`${BASE_URL}/comments`, options);
  const newReview = await response.json();
  return newReview;
};

const removeReview = async reviewId => {
  const url = `${BASE_URL}/comments/${reviewId}`;
  const options = {
    method: 'DELETE',
  };

  const response = await fetch(url, options);
  const review = await response.json();
  return review;
};

const updateReviewById = async (update, reviewId) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  };

  const response = await fetch(`${BASE_URL}/comments/${reviewId}`, options);
  const review = await response.json();
  return review;
};

const fetchReviewById = async reviewId => {
  const response = await fetch(`${BASE_URL}/comments/${reviewId}`);
  const review = await response.json();
  return review;
};

const reviewsApiService = {
  fetchReviews,
  addReview,
  removeReview,
  updateReviewById,
  fetchReviewById,
};

export default reviewsApiService;

/////////////////

// export default class ReviewsApiService {
//   constructor() {
//     this.page = 1;
//   }

//   async fetchReviews() {
//     const url = `${BASE_URL}/comments?_page=${this.page}&_limit=2`;

//     const response = await fetch(url);
//     const { comments } = await response.json();
//     this.incrementPage();
//     return comments;
//   }

//   async addReview(review) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(review),
//     };

//     const response = await fetch(`${BASE_URL}/comments`, options);
//     const newReview = await response.json();
//     return newReview;
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
