const Authentication = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};
module.exports = Authentication;
