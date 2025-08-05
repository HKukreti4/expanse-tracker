class ErrorHandler extends Error {
  statusCode: number;

  constructor(message = `Something Went Wrong`, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
const errorHandler = ErrorHandler;
export default errorHandler;
