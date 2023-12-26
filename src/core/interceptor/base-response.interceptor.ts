import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) data = {};
        return {
          data: data.data || data,
          metadata: {
            links: {
              self: context.switchToHttp().getRequest().originalUrl,
            },
            pagination: data.pagination,
          },
        };
      }),
    );
  }
}
