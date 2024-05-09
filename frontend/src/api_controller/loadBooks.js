import axios from "axios";

const backend_server_url = "http://localhost:4000/api/v1";
const api_endpoint = backend_server_url + "/books/get-books";

const fetchBooks = async function () {
    try {
        const response = await axios.get(api_endpoint);
        return response.data.books;
    } catch (err) {
        console.log(err);
    }
};

export { fetchBooks };
