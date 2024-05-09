//
//all api endpoints here
export const base_url = "http://localhost:4000/api/v1"

export const endpoints = {
  userInfo: "/auth/user-info",
  userLogin: "/auth/login/",
  userSignup: "/auth/signup/",
  getBooks: "/books/get-books/",
  getBook: "/books/get-book/",
  createBook: "/books/create-book/",
  updateBook: "/books/update-book/",
  deleteBook: "/books/delete-book/",
  addReview: "/reviews/add-review/",
  editReview : "/reviews/edit-review/",
  deleteReview : "/reviews/delete-review/",
  getReviewsByBookId : "reviews/get-book-reviews/",
  getReviewsByUsername : "reviews/get-user-reviews/",
  likeReview : '/reviews/like-review/',
  dislikeReview: '/reviews/dislike-review/',
  challenge: "/challenges/get-challenge",
}