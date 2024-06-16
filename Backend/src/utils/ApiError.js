// exports.sendErrorResponse = (res, statusCode, errorMsg) => {
//     return res.status(statusCode).json({
//       msg: errorMsg,
//       error: errorDetail,
//     });
//   };




class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super()
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

module.exports = {ApiError}