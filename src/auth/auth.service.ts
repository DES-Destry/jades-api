import { Injectable } from '@nestjs/common';
import { AccessTokenPayload } from 'src/shared/domain/common/access-token.payload';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { AuthorizedResponseDto } from './dtos/common/auth.dto';
import { TokenService } from './modules/token/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly _tokenService: TokenService) {}

  public async refreshToken(
    refreshToken: string,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    // Get access token from refresh token
    const accessToken = await this.extractAccessTokenFromRefresh(refreshToken);

    // Get user content from access token as payload
    const userPayload = await UserPayload.createFromTokenOrNull(accessToken);

    // If access token from refresh is not valid
    if (!userPayload) {
      ResultFactory.unauthorized('Access token is not valid');
    }

    // Generate new pair of tokens from user payload
    const tokenPair = await this._tokenService.generateTokenPairForPayload(
      userPayload,
    );

    return ResultFactory.ok({
      ...tokenPair,
      userId: userPayload.id,
    });
  }

  private async extractAccessTokenFromRefresh(
    refreshToken: string,
  ): Promise<string> {
    // If refresh token is blacklisted
    if (this._tokenService.isRefreshTokenInBlacklist(refreshToken)) {
      ResultFactory.unauthorized('Refresh token is not valid');
    }

    // Get content from refresh token
    const accessTokenPayload = await AccessTokenPayload.createFromTokenOrNull(
      refreshToken,
    );

    // If refresh token is not valid
    if (!accessTokenPayload) {
      ResultFactory.unauthorized('Refresh token is not valid');
    }

    // If access token from refresh is blacklisted
    if (this._tokenService.isAccessTokenInBlacklist(accessTokenPayload.token)) {
      ResultFactory.unauthorized('Access token is not valid');
    }

    return accessTokenPayload.token;
  }
}
