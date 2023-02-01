const asyncErrorsHandler = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncErrorsHandler;
