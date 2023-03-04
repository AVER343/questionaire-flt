import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class OnlyAuthenticated implements CanActivate {
    canActivate(context: ExecutionContext): any;
}
