const dotenv = require("dotenv");
dotenv.config();
const VALIDATOR_API_URL = process.env.VALIDATOR_API_URL || null;

/**
 * 
 * @param {*} req 
 * @param {string[]} usernames 
 * @returns 
 */
const getUserInfos = async (req, usernames) => {
  if (BOOK_API_URL) {
    let data = await fetch(`${VALIDATOR_API_URL}/v3/get-user-infos-by-usernames`, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify({
        usernames: JSON.stringify(usernames),
      }),
    });
    if (data.status === 200) {
      const data = data.json();
      return data.data;
    }
    throw new Error(data.status);
  }
  throw new Error("Authent host service URL error");
};

module.exports = {getUserInfos}