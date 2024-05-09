import googleBookApi from "../utils/googleBookApi.js";

export const getList = async (req, res) => {
  const { search, maxResults } = req.query;
  const result = await googleBookApi(search, maxResults);

  res.status(200).json({
    success: result.success,
    books: result.books,
  });
};
