import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { UserPayload } from '../domain/common/user.payload';

@Injectable()
export class AuthOptionalGuard implements CanActivate {
  private _userService: UserService;

  constructor(private readonly _moduleRef: ModuleRef) {}

  async onModuleInit() {
    this._userService = await this._moduleRef.resolve(UserService);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = this.extractTokenFromRequest(request);
    const userPayload = await UserPayload.createFromTokenOrNull(accessToken);

    const user = await this._userService.getForPayloadOrNull(userPayload);

    request.user = user;
    delete request.user.props;

    return true;
  }

  private extractTokenFromRequest(request: any): string {
    const authorization: string = request.headers.get('Authorization');
    if (
      !authorization ||
      !authorization.startsWith('Bearer') ||
      authorization.split(' ').length !== 2
    ) {
      return null;
    }

    return authorization.split(' ')[1];
  }
}
