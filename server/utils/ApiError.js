class ApiError {
    constructor(res, statusCode, message) {
        this.res = res;
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;

        this.res.status(this.statusCode).json({
            success: this.success,
            message: this.message || "Something went wrong",
        });
    }
}

module.exports = ApiError;
