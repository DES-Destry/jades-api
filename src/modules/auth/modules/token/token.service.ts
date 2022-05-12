import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenPayload } from 'src/shared/domain/common/access-token.payload';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { TokenPairDto } from './dtos/token-pair.dto';
import { ITokenBlacklistRepository } from './interfaces/token-blacklist-repository.interface';

@Injectable()
export class AuthTokenService {
  constructor(
    @Inject('ITokenBlacklistRepository')
    private readonly _tokenBlacklistRepository: ITokenBlacklistRepository,
  ) {}

  public async generateTokenPairForPayload(
    payload: UserPayload,
  ): Promise<TokenPairDto> {
    if (!payload) {
      return null;
    }

    const accessToken = await payload.generateAccessToken();

    // Refresh token generating
    const accessTokenPayload = new AccessTokenPayload(accessToken);
    const refreshToken = await accessTokenPayload.generateRefreshToken();

    return {
      accessToken,
      refreshToken,
    };
  }

  public async addRefreshTokenToBlacklist(
    refreshToken: string,
  ): Promise<boolean> {
    const accessTokenPayload = await AccessTokenPayload.createFromTokenOrNull(
      refreshToken,
    );

    if (!accessTokenPayload) {
      return false;
    }

    await this._tokenBlacklistRepository.createBlacklistItem(
      accessTokenPayload.token,
      refreshToken,
    );

    return true;
  }

  public async isAccessTokenInBlacklist(accessToken: string): Promise<boolean> {
    if (!accessToken) {
      return true;
    }

    const blacklistItem = await this._tokenBlacklistRepository.getByAccessToken(
      accessToken,
    );

    return Boolean(blacklistItem);
  }

  public async isRefreshTokenInBlacklist(
    refreshToken: string,
  ): Promise<boolean> {
    if (!refreshToken) {
      return true;
    }

    const blacklistItem =
      await this._tokenBlacklistRepository.getByRefreshToken(refreshToken);

    return Boolean(blacklistItem);
  }
}
