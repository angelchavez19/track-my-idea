import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenManager } from 'src/common/token.common';
import { Roles } from 'src/decorators/role/role.decorator';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly token: TokenManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const payload = this.token.getAccessTokenFromRequest(request);

    console.log('payload', payload);

    if (!payload) return !roles;

    request.user = payload;

    if (!roles) return true;

    return roles.includes(payload.role);
  }
}
