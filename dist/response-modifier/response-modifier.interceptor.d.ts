import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ResponseObject<M, T> {
    response: M;
    type: ResponseType<T>;
}
export type ResponseType<T> = 'error' | 'success' | 'info' | T;
export declare class ResponseModifierInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
