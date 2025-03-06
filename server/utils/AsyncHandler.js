const ApiError = require("./ApiError");

const AsyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (err) {
        return new ApiError(res, 500, "Internal Server Error");
    }
};
module.exports = AsyncHandler;
