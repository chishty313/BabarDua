import axios from "axios";

//file or methods import
import { base_url, endpoints } from "./api-endpoints.js";

axios.defaults.withCredentials = true;
//user auth//

//signup//
export const _userSignup = async function (user) {
  const api_endpoint = `${base_url}${endpoints.userSignup}`;
  try {
    const response = await axios.post(api_endpoint, user);
      return response.data; // return a json with user
  } catch (err) {
    // console.log(err.response.data.message);
    console.log(err.message)
  }
};
//test signup
// const newUser ={username: "uniquename", firstName: "Faysel", lastName: "Rajo", email:"unique@gmail.com", password: "122345"}
// _userSignup(newUser).then(data => console.log(data))

//signup//
export const _userLogin = async function (credential) {
  const api_endpoint = `${base_url}${endpoints.userLogin}`;
  try {
    const response = await axios.post(
      api_endpoint,
      credential
      // ,
      // { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log({ err });
    console.log(err.message)
  }
};
// const credential ={username: "messi", firstName: "Faysel", lastName: "Rajo", email:"messi@gmail.com", password: "122345"}
// _userLogin(credential).then(data => console.log(data))


// ! getting user info
export const _userInfo = async function (credential) {
  const api_endpoint = `${base_url}${endpoints.userInfo}`;
  try {
    const response = await axios.get(
      api_endpoint,
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log({ err });
    console.log(err.message)
  }
};

//get all books//
export const _fetchBooks = async function () {
  const api_endpoint = `${base_url}${endpoints.getBooks}`;
  try {
      const response = await axios.get(api_endpoint);
      return response.data.books; // returns list of book objects
  } catch (err) {
      console.log(err.message);
  }
};
//test fetchBooks
//fetchBooks().then(data => console.log(data));

//get single book //
export const _fetchBookById = async function (id) {

  const api_endpoint = `${base_url}${endpoints.getBook}${id}`;
  try {
    const response = await axios.get(api_endpoint);
    console.log(response.data);
    return response.data; //retruns a single book object
  } catch (err) {
      console.log(err.message);
  }
};
//test
// fetchBookById("655e5ff16f4a5dbb583faca7").then(data => console.log(data))


// ------- Shelves ---------- //
const tmpToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTZhMGViMDhkODM2ZTFjNTQ0NzA1MGMiLCJlbWFpbCI6ImZheXNlbEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZheXNlbCIsImlhdCI6MTcwMTQ1MTU4NCwiZXhwIjoxNzAxNTM3OTg0fQ.GuWPgAJKdNWFN6UElovxM6txb64eo_8NzKa_Hqq1mQY"

//create a shelf //
export const _createShelf = async function (label) {
  console.log({ label: label });
  const api_endpoint = `${base_url}/user/create-shelf`;


  try {
    const response = await axios.patch(api_endpoint, { label });
    console.log(response.data)
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err.message);
  }
};
//test
// _createShelf("faysel", "newOne", ).then(data => console.log(data))


//get all shelves of a user //
export const _getShelves = async function (username) {
  const api_endpoint = `${base_url}/user/${username}/shelves`;
  try {
    const response = await axios.get(api_endpoint);
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err.message);
  }
};
//test
// _getShelves("faysel").then(data => console.log(data))


// delete shelf //
export const _deleteShelf = async function (shelfId) {
  console.log({ shelfId });
  const api_endpoint = `${base_url}/user/delete-shelf/${shelfId}`;

  try {
    const response = await axios.delete(api_endpoint);
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err.message);
  }
};
//test
// _deleteShelf(tmpToken,"faysel", "newOne").then(data => console.log(data))



// add book to shelf //
export const _addBookToShelf = async function (bookId, shelfId) {
  console.log({ shelfId, bookId });
  const api_endpoint = `${base_url}/user/shelves/${shelfId}/add-book`;

  try {
    const response = await axios.patch(api_endpoint, { bookId });
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err.message);
  }
};
//test
// 



// remove book from shelf //
export const _removeFromShelf = async function (bookId, shelfId) {
  const api_endpoint = `${base_url}/user/shelves/${shelfId}/remove-book`;

  try {
    const response = await axios.patch(api_endpoint, { bookId });
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err);
  }
};
//test
// const tmpBookId = "655c96c9545a2f3bb0b7c128"
// _removeFromShelf(tmpToken, "faysel", "finance", tmpBookId).then((data)=> console.log(data))



// ------------------ Review ------------------ //

const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTcyMjNhOTVjMjQ5OTY2NTY0ODU1NTgiLCJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcm5hbWUiOiJhYmMiLCJpYXQiOjE3MDIwMjEwMzQsImV4cCI6MTcwMjEwNzQzNH0.HvYkabE8hjO7bEedUBzmq5f98NMAhs-7Lb_slERbwD4"
// add a review //
export const _addReview = async function (reviewData) {
  const api_endpoint = `${base_url}/reviews/add-review`;


  try {
    const response = await axios.post(api_endpoint, reviewData);
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};
// // test
// const reviewData = {
//   bookId: "655d0b16ca1df7808c938326",
//   rating: 4,
//   reviewText: "It is really a good book"
// };

// _addReview(tempToken, reviewData).then(data => console.log(data));

// edit review //
export const _editReview = async function ({ id, reviewText, rating, bookId }) {
  // console.log({ id, reviewText, rating, bookId });
  const api_endpoint = `${base_url}/reviews/edit-review/${id}`;


  try {
    const response = await axios.put(api_endpoint, { reviewText, rating, bookId });
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};

//test
// const reviewData = {
//   bookId: "655d0b16ca1df7808c938326",
//   rating: 3,
//   reviewText: "This is a good book"
// };

// _editReview(tempToken, reviewData).then(data => console.log(data));

//delete review//
export const _deleteReview = async function (authToken, reviewData) {
  const api_endpoint = `${base_url}/reviews/delete-review`;

  // Request headers with Authorization token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.delete(api_endpoint, {
      headers,
      data: reviewData, 
    });
    
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// test
// const reviewData = {
//   "bookId": "655d0b16ca1df7808c938326",
//   "deleteReviewText" : true,
//   "deleteRating" : true
// };

// _deleteReview(tempToken, reviewData).then(data => console.log(data));


//get review by book id
export const _getReviewsByBookId = async function (bookId) {
  const api_endpoint = `${base_url}/reviews/get-book-reviews/${bookId}`;

  try {
    const response = await axios.get(api_endpoint);
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};

//test
// _getReviewsByBookId(tempToken, "655d0b16ca1df7808c938326").then(data => console.log(data))

//get review by username
export const _getReviewsByUsername = async function (authToken) {
  const api_endpoint = `${base_url}/reviews/get-book-reviews/username`;

  // Request headers with Authorization token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.get(api_endpoint, {headers});
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};

//test
//getReviewsByUsername("syed").then(data => console.log(data))

export const _likeReview = async function ({ id }) {
  const api_endpoint = `${base_url}/reviews/like-review/${id}`;
  // // Request headers with Authorization token
  // const headers = {
  //   Authorization: `Bearer ${authToken}`,
  //   'Content-Type': 'application/json',
  // };
  try {
    const response = await axios.post(api_endpoint, {});
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};

//test
//likeReview("656a22401c76b05b0b2047c0").then(data => console.log(data))

export const _dislikeReview = async function ({ id }) {
  const api_endpoint = `${base_url}/reviews/dislike-review/${id}`;


  try {
    const response = await axios.post(api_endpoint, {});
    // console.log(response)
      return response.data; //returns a success message
  } catch (err) {
      console.log(err.message);
  }
};

//test
//dislikeReview("656a22401c76b05b0b2047c0").then(data => console.log(data))

// ------------------ Take Challenge ------------------ //
// get user challenge details //
export const _getChallenge = async function () {
  const api_endpoint = `${base_url}/challenges/get-challenge`;

  // Request headers with Authorization token
  // const headers = {
  //   Authorization: `Bearer ${authToken}`,
  //   'Content-Type': 'application/json',
  // };
  try {
    const response = await axios.get(api_endpoint);
    
      return response.data;
  } catch (err) {
      console.log(err.message);
  }
};

//test get Challenge
//_getChallenge(tempToken).then(data => console.log(data));


// add target number of books //
export const _addTargetBooks = async function (authToken, targetData ) {
  const api_endpoint = `${base_url}/challenges/add-target-books`;

  // Request headers with Authorization token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(api_endpoint, targetData, {headers});
      return response.data; 
  } catch (err) {
      console.log(err.message);
  }
};
//test
// const targetData = {
//   "targetBooks" : 5
// };

// _addTargetBooks(tempToken, targetData).then(data => console.log(data));

// update target number of books //
export const _updateTargetBooks = async function (targetData) {
  console.log({ targetData });
  const api_endpoint = `${base_url}/challenges/update-target-books`;


  try {
    const response = await axios.patch(api_endpoint, targetData);
      return response.data; 
  } catch (err) {
      console.log(err.message);
  }
};

//test
// const targetData = {
//   "targetBooks" : 3
// };

// _updateTargetBooks(tempToken, targetData).then(data => console.log(data));


// delete challenge //
export const _deleteChallenge = async function (authToken) {
  const api_endpoint = `${base_url}/challenges/delete-challenge`;

  // Request headers with Authorization token
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.delete(api_endpoint, { headers });
    console.log('Request Headers:', headers);
    console.log('Response:', response);
    return response.data;
  } catch (err) {
    console.error('Error:', err.message);
    if (err.response) {
      console.log('Response Data:', err.response.data);
    }
  }
  
  // try {
  //   const response = await axios.delete(api_endpoint, { headers });
  //   console.log('Response:', response);
  //     return response.data;
  // } catch (err) {
  //     console.log(err.message);
  // }
};

// test
//_deleteChallenge(tempToken).then(data => console.log(data))



//update user //
export const _updateUser = async function (editedData) {
  //edited data can optionally contain firstName, lastName, email, bio, preferredGenres
  const api_endpoint = `${base_url}/user`;

  try {
    const response = await axios.patch(api_endpoint, editedData);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

//delete user //
export const _deleteUser = async function (id) {
  //edited data can optionally contain firstName, lastName, email, bio, preferredGenres
  const api_endpoint = `${base_url}/user/${id}`;

  try {
    const response = await axios.delete(api_endpoint);
      return response.data; //retruns a success message
  } catch (err) {
      console.log(err.message);
  }
};

// get challenge leader board
export const _getLeaderBoard = async function () {

  const api_endpoint = `${base_url}/challenges/challenge-leaderboard`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// create book request
export const _createBookRequest = async function (requestBookPayload) {

  const api_endpoint = `${base_url}/book-request`;

  try {
    const response = await axios.post(api_endpoint, requestBookPayload);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// get all book request
export const _getAllBookRequest = async function () {

  const api_endpoint = `${base_url}/book-request`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// get all book request
export const _getSpecificBookRequest = async function (id) {

  const api_endpoint = `${base_url}/book-request/${id}`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};


// get user specific and book specific review
export const _getSpecificBookRequestByUser = async function (id) {

  const api_endpoint = `${base_url}/reviews/get-book-reviews/${id}`;

  try {
    const response = await axios.get(api_endpoint);
    console.log(response.data);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};


// ! get review by user
// create book request
export const _getUserBookReview = async function (id) {

  const api_endpoint = `${base_url}/reviews/get-user-reviews/${id}`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};


// ! report comment
// create book request
export const _reportCommentReview = async function ({ id, comment }) {

  const api_endpoint = `${base_url}/reviews/review-report/${id}`;

  try {
    const response = await axios.post(api_endpoint, { comment });
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! create a new book
export const _createBook = async function (bookInfo) {

  const api_endpoint = `${base_url}/books/create-book`;

  try {
    const response = await axios.post(api_endpoint, bookInfo);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! create contest
export const _createContest = async function (contestInfo) {

  const api_endpoint = `${base_url}/contest`;

  try {
    const response = await axios.post(api_endpoint, contestInfo);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! get all contest
export const _allContest = async function () {

  const api_endpoint = `${base_url}/contest`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! add Contest response
export const _createContestResponse = async function (responseInfo) {

  const api_endpoint = `${base_url}/contest-response`;

  try {
    const response = await axios.post(api_endpoint, responseInfo);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! add Contest response
export const _getAllContestResponse = async function (responseInfo) {

  const api_endpoint = `${base_url}/contest-response`;

  try {
    const response = await axios.get(api_endpoint);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};

// ! add Contest response
export const _updateContest = async function (id, responseInfo) {

  const api_endpoint = `${base_url}/contest/${id}`;

  try {
    const response = await axios.patch(api_endpoint, responseInfo);
    return response.data; //retruns a success message
  } catch (err) {
    console.log(err.message);
  }
};
