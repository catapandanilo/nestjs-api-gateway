import { NestInterceptor, ExecutionContext, CallHandler, Logger, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    Logger.log('Before...');
    return next.handle().pipe(tap(() => Logger.log(`After...`)));
  }
}