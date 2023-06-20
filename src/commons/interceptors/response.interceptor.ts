import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import Express from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBody } from '@commons';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseBody<T>>
{
  private readonly requestLogger = new Logger('HTTP Request');
  private readonly responseLogger = new Logger('HTTP Response');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody<T>> {
    const request = context.switchToHttp().getRequest<Express.Request>();
    const response = context.switchToHttp().getResponse<Express.Response>();

    this.requestLogger.log(
      `{${request.method}, ${request.url}}, {${request.ip}}, {${request.get(
        'User-Agent',
      )}}`,
    );

    return next.handle().pipe(
      map((data) => {
        this.responseLogger.log(
          `{${request.method}, ${request.url}}, {${request.ip}}, {${
            response.statusCode
          }, "${
            response.statusMessage ? response.statusMessage : 'No Message'
          }"}\n`,
        );

        return {
          status: {
            isSuccess: true,
            code: response.statusCode,
            message: response.statusMessage ? response.statusMessage : null,
            timestamp: new Date().toISOString(),
            path: response.req.path,
          },
          data,
        };
      }),
    );
  }
}
