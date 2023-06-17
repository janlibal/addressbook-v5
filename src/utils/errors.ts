export class BadRequest extends Error {
  status = 400
  name = 'BadRequest'
  expose = false
}

export class Unauthorized extends Error {
  status = 401
  name = 'Unauthorized'
  expose = false
}

export class Forbidden extends Error {
  status = 403
  name = 'Forbidden'
  expose = false
}

export class NotFound extends Error {
  status = 404
  name = 'NotFound'
  expose = false
}

export class Conflict extends Error {
  status = 409
  name = 'Conflict'
  expose = false
}

export class InternalServerError extends Error {
  status = 500
  name = 'InternalServerError'
  expose = false
}

export class ResourceAlreadyExists extends Conflict {
  name = 'ResourceAlreadyExists'
  constructor() {
      super('Resource already exists')
  }
}

export class ResourceNotFound extends NotFound {
  name = 'ResourceNotFound'
  constructor() {
      super('Resource not found')
  }
}

export class RequestValidationErrors extends BadRequest {
  name = 'RequestValidationErrors'
  constructor(errorMessage: string) {
      super(`Request Validation Errors: ${errorMessage}`)
  }
}

export class InvalidToken extends Forbidden {
  name = 'InvalidToken'
  constructor() {
      super('Invalid Token')
  }
}
