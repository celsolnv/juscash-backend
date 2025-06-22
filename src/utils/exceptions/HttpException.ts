class HttpStatus {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly ACCEPTED = 202;
  static readonly NO_CONTENT = 204;
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly BAD_GATEWAY = 502;
  static readonly TOO_LARGE = 413;
}

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export { HttpException, HttpStatus };
