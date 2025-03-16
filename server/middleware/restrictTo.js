const User = require("../model/User");
const ApiError = require("../utils/ApiError");
const AsyncHandler = require("../utils/AsyncHandler");

const restrictTo = (role) => {
    return AsyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.role !== role) {
            throw new ApiError(
                403,
                "You do not have permission to perform this action"
            );
        }

        next();
    });
};

module.exports = restrictTo;
