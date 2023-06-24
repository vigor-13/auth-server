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
  private readonly logger = new Logger('Response Interceptor');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody<T>> {
    const request = context.switchToHttp().getRequest<Express.Request>();
    const response = context.switchToHttp().getResponse<Express.Response>();

    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          `{${request.method}, ${request.url}}, {${request.ip}}, {${request.get(
            'User-Agent',
          )}}, {${response.statusCode}, "${
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
