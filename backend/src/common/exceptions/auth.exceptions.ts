import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateEmailException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'User with this email already exists',
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

