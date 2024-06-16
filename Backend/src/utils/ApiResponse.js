class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

module.exports = { ApiResponse };



// exports.sendSuccessResponse = (res, statusCode, message, data = {}) => {
//     return res.status(statusCode).json({
//       responseCode: statusCode,
//       message,
//       ...data,
//     });
//   };