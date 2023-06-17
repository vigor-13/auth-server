import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import Express from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseBody<T> {
  status: {
    isSuccess: boolean;
    code: number;
    message: string | null;
    timestamp: string;
    path: string;
  };
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseBody<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody<T>> {
    const response = context.switchToHttp().getResponse<Express.Response>();
    const { statusCode, statusMessage, req } = response;
    const { path } = req;

    return next.handle().pipe(
      map((data) => {
        return {
          status: {
            isSuccess: true,
            code: statusCode,
            message: statusMessage ? statusMessage : null,
            timestamp: new Date().toISOString(),
            path,
          },
          data,
        };
      }),
    );
  }
}
