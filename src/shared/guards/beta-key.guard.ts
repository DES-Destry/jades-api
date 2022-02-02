import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppConfig } from '../config/app.config';

@Injectable()
export class BetaKeyGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isDevelopment = AppConfig.Environment === 'development';

    if (!isDevelopment) {
      return true;
    }

    const betaKey = request.query.beta_key;

    return betaKey === AppConfig.BetaKey;
  }
}
