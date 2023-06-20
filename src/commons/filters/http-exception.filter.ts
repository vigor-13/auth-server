import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import Express from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP Response');

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Express.Request>();
    const response = context.getResponse<Express.Response>();
    const statusCode = exception.getStatus();
    const message = exception.message;

    this.logger.error(
      `{${request.method}, ${request.url}}, {${request.ip}}, {${statusCode}, "${
        message ? message : 'No Message'
      }"}\n`,
    );

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
