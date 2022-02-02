import { ITokenBlacklistItem } from 'src/shared/domain/interfaces/token-blacklist-item.interface';

export interface ITokenBlacklistRepository {
  getById(id: string): Promise<ITokenBlacklistItem>;
  getByAccessToken(accessToken: string): Promise<ITokenBlacklistItem>;
  getByRefreshToken(refreshToken: string): Promise<ITokenBlacklistItem>;

  createBlacklistItem(
    accessToken: string,
    refreshToken: string,
  ): Promise<ITokenBlacklistItem>;
}
