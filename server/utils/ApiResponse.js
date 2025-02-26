class ApiResponse {
    constructor(res, statusCode, data, message = "Success") {
        this.res = res;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;

        // Immediately send the response
        this.res.status(this.statusCode).json({
            success: this.success,
            data: this.data || null,
            message: this.message,
        });
    }
}

module.exports = ApiResponse;
