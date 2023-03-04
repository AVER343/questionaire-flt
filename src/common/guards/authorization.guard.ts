import { PrismaClient, UserEmail, Users } from '@prisma/client';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reflector } from '@nestjs/core/services';

@Injectable()
export class CheckAPIAuthorization implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const api_name = this.reflector.get<string[]>(
      'API_NAME',
      context.getHandler(),
    ) as unknown as string;
    let user_id = request?.user?.id;
    let roles = (
      await this.prismaService.userRole.findMany({
        where: {
          user_id,
        },
      })
    ).map((e) => e.user_role);

    // is role authorized to access the api
    let isAuthorized =
      !!!(await this.prismaService.apiRolePermissions.findFirst({
        where: {
          role_type_id: { in: roles },
          ApiNames: {
            api_name,
          },
        },
      }));
    let hasSpecialPermissions = null;
    // does individual has special permissions
    if (!isAuthorized) {
      hasSpecialPermissions =
        !!!(await this.prismaService.special_permissions.findFirst({
          where: { user_id, ApiNames: { api_name } },
        }));
    }

    if (!isAuthorized && !hasSpecialPermissions)
      throw new UnauthorizedException('Unauthorized access');

    return true;
  }
}
