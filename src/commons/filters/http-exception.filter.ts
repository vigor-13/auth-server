import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import Express from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Express.Request>();
    const response = context.getResponse<Express.Response>();
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
