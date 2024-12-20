const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: err.message });
};

module.exports = { globalErrorHandler };
