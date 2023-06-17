import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();
    const message = exception.message;

    response.status(statusCode).json({
      status: {
        isSuccess: false,
        code: statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      data: null,
    });
  }
}
