const dotenv = require("dotenv");
dotenv.config();
const BOOK_API_URL = process.env.BOOK_API_URL || null;

/**
 * @param {*} req
 * @param {String} bookId
 * @returns {Array}
 */
const getBookInfo = async (req, bookId) => {
  if (BOOK_API_URL) {
    let data = await fetch(`${BOOK_API_URL}/books/post-get-by-id`, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify({
        ids: [bookId],
      }),
    });
    if (data.status === 200) {
      const data = data.json();
      return data.data;
    }
    throw new Error(data.status);
  }
  throw new Error("Book host service URL error");
};

/**
 *
 * @param {*} req
 * @param {string} copyId
 * @returns {Object}
 */
const getBookCopyInfo = async (req, copyId) => {
  if (BOOK_API_URL) {
    let data = await fetch(
      `${BOOK_API_URL}/book-copy/get-copy-info?copyId=${copyId}`,
      {
        method: "GET",
        headers: req.headers,
      }
    );
    if (data.status === 200) {
      return data.json();
    }
    throw new Error(data.status);
  }
  throw new Error("Book host service URL error");
};

/**
 *
 * @param {*} req
 * @param {string} copyId
 * @returns {Object}
 */
const handleBorrowBook = async (req, copyId) => {
  if (BOOK_API_URL) {
    let data;
    fetch(
      `${BOOK_API_URL}/book-copy-command/post-borrow`,
      {
        method: "POST",
        headers: req.headers,
        body: JSON.stringify({
          copyId: copyId,
        }),
      }
    )
    .then(response => response.json())
    .then(result => data = result);
    return data;
  }
  throw new Error("Book host service URL error");
};

/**
 *
 * @param {*} req
 * @param {string} copyId
 * @returns {Object}
 */
const handleReturnBook = async (req,copyId) => {
  if (BOOK_API_URL) {
    let data;
    fetch(
      `${BOOK_API_URL}/book-copy-command/post-return`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization,
        },
        body: JSON.stringify({
          copyId: copyId,
        }),
      }
    )
    .then(response => response.json())
    .then(result => data = result);
    return data;
  }
  throw new Error("Book host service URL error");
};

module.exports = { getBookInfo, getBookCopyInfo, handleBorrowBook, handleReturnBook };
