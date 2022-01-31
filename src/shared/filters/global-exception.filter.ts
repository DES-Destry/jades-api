import { Catch, ExceptionFilter } from '@nestjs/common';
import { ResultFactory } from '../result/result-factory';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: any) {
    ResultFactory.internalServerError(exception.message);
  }
}
