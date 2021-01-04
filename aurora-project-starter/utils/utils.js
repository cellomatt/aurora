const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

module.exports = { asyncHandler };
