const jwt = require("jsonwebtoken");
const AsyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");

const Authentication = AsyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw new ApiError(401, "Unauthorized");
    }

    req.user = decoded;
    next();
});
module.exports = Authentication;
