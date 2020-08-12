import { NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    Logger.log('Before...');
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`After...`))
      );
  }
}