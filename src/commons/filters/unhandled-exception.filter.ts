import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import Express from 'express';

@Catch()
export class UnhandledExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('All Exception Filter');

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Express.Request>();
    const response = context.getResponse<Express.Response>();

    const statusCode = 500;
    const responseMessage = 'Internal server error';

    this.logger.error(
      `{${request.method}, ${request.url}}, {${request.ip}}, {${statusCode}, "${
        exception.message ? exception.message : 'No Message'
      }"}\n`,
    );

    response.status(statusCode).json({
      status: {
        isSuccess: false,
        code: statusCode,
        message: responseMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      data: null,
    });
  }
}
