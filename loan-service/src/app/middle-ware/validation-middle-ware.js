const dotenv = require("dotenv");
dotenv.config();
const VALIDATE_URL = process.env.VALIDATOR_API_URL || null;

async function validatorHandler(req, res, next) {
  if (VALIDATE_URL) {
    try {
      let validateRes = await fetch(`${VALIDATE_URL}/v3/validate`, {
        method: "POST",
        headers: req.headers,
      });
      if (validateRes.status === 200) {
        next();
        return;
      }
      res.status(401).json({ message: "Access denined" });
      return;
    } catch (err) {
      res.status(500).json({ message: "Validation host URL exception" });
      return;
    }
  }
  res.status(500).json({ message: "Validation host URL error" });
}

module.exports = { validatorHandler }