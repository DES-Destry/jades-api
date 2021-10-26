import { HttpException, HttpStatus } from '@nestjs/common';
import { ActionResultDto } from './dtos/action-result.dto';

export class ResultFactory {
  public static ok<T>(data: T): ActionResultDto<T> {
    return {
      data,
      isOk: true,
    };
  }

  public static badRequest(errorMessage = 'No message'): void {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
        },
        isOk: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public static unauthorized(errorMessage = 'No message') {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
        },
        isOk: false,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  public static forbidden(errorMessage = 'No message') {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
        },
        isOk: false,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  public static notFound(errorMessage = 'No message') {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
        },
        isOk: false,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public static internalServerError(errorMessage = 'No message') {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
        },
        isOk: false,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  public static validationError(
    errorMessage = 'No message',
    validationErrors: string[],
  ) {
    throw new HttpException(
      {
        data: {
          message: errorMessage,
          validationErrors,
        },
        isOk: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
