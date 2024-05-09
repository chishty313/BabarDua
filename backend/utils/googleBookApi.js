import axios from "axios";

const googleBookApi = async (searchQuery, maxResults = 10) => {
  //search by author, title and matching
  if (!searchQuery) {
    return {sucess: false}
  }
  const apiEndpoint = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}`;

  const result = await axios.get(apiEndpoint);
  let books = [];
  if (result.data) {
    // complete the function
    const items = result.data.items;
    // books = result.data.items;
    
    for (let i = 0; i < items.length; i++) {
      const {
        title,
        subtitle,
        authors,
        pulisher,
        pulishedDate,
        description,
        pageCount,
        categories,
        averageRating,
        ratingsCount,
        imageLinks,
        previewLink,
        industryIdentifiers
      } = items[i].volumeInfo;

      const bookObj = {
        id: items[i].id,
        title,
        subtitle,
        authors,
        pulisher,
        pulishedDate,
        description,
        pageCount,
        categories,
        averageRating,
        ratingsCount,
        imageLinks,
        previewLink,
      };
      let isbn = industryIdentifiers[0];
      bookObj._isbn = isbn.identifier;
      
      //add to the array
      books.push(bookObj);

    }
  }
  return {success: true, books};
};

export default googleBookApi;
