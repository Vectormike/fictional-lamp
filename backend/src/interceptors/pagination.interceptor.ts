import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const { page, limit, total } = data;
        return {
          current_page: page,
          data: data.data,
          per_page: limit,
          total,
          last_page: Math.ceil(total / limit),
        };
      }),
    );
  }
}
