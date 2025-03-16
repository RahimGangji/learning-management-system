const ApiError = require("./ApiError");

const AsyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (err) {
        next(err);
    }
};
module.exports = AsyncHandler;
