import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reflector } from '@nestjs/core/services';
export declare class CheckAPIAuthorization implements CanActivate {
    private reflector;
    private prismaService;
    constructor(reflector: Reflector, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
