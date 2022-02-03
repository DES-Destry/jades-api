import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserPayload } from '../domain/common/user.payload';
import { ResultFactory } from '../result/result-factory';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = this.extractTokenFromRequest(request);
    const userPayload = await UserPayload.createFromTokenOrNull(accessToken);

    const user = await this._userService.getForPayloadOrNull(userPayload);
    if (!user) {
      ResultFactory.unauthorized('Access token is not valid!');
    }

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
      ResultFactory.unauthorized('Access token not found!');
    }

    return authorization.split(' ')[1];
  }
}
