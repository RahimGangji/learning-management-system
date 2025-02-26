const User = require("../model/User");

const restrictTo = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            if (user.role !== role) {
                return res.status(403).json({
                    status: "false",
                    message:
                        "You do not have permission to perform this action",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                status: "false",
                message: "Server error",
            });
        }
    };
};

module.exports = restrictTo;
