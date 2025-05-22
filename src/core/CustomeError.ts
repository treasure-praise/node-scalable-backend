import { ApiError,ErrorType } from "./ApiError";

export class CustomeError extends ApiError{
    constructor(message:string = "Bad Request"){
        super(ErrorType.BAD_REQUEST,400,message,)
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Not Found") {
        super(ErrorType.NOT_FOUND, 404, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = "Unauthorized") {
        super(ErrorType.UNAUTHORIZED, 401, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden") {
        super(ErrorType.FORBIDDEN, 403, message);
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string = "Internal Server Error") {
        super(ErrorType.INTERNAL_SERVER_ERROR, 500, message);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string = "Conflict") {
        super(ErrorType.CONFLICT, 409, message);
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message: string = "Unprocessable Entity") {
        super(ErrorType.UNPROCESSABLE_ENTITY, 422, message);
    }
}