import { InjectModel } from '@nestjs/sequelize';
import { ITokenBlacklistItem } from 'src/shared/domain/interfaces/token-blacklist-item.interface';
import { TokenBlacklistItem } from 'src/shared/domain/token-blacklist-item';
import { ITokenBlacklistRepository } from '../interfaces/token-blacklist-repository.interface';
import { TokenBlacklistItemModel } from '../models/token-blacklist-item.model';

export class TokenBlacklistRepository implements ITokenBlacklistRepository {
  constructor(
    @InjectModel(TokenBlacklistItemModel)
    private readonly _tokenBlacklistItemModel: typeof TokenBlacklistItemModel,
  ) {}

  public async getById(id: string): Promise<ITokenBlacklistItem> {
    if (!id) {
      return null;
    }

    const model = await this._tokenBlacklistItemModel.findByPk(id);
    return model && TokenBlacklistItem.transform(model);
  }
  public async getByAccessToken(
    accessToken: string,
  ): Promise<ITokenBlacklistItem> {
    if (!accessToken) {
      return null;
    }

    const model = await this._tokenBlacklistItemModel.findOne({
      where: { accessToken },
    });
    return model && TokenBlacklistItem.transform(model);
  }
  public async getByRefreshToken(
    refreshToken: string,
  ): Promise<ITokenBlacklistItem> {
    if (!refreshToken) {
      return null;
    }

    const model = await this._tokenBlacklistItemModel.findOne({
      where: { refreshToken },
    });
    return model && TokenBlacklistItem.transform(model);
  }

  public async createBlacklistItem(
    accessToken: string,
    refreshToken: string,
  ): Promise<ITokenBlacklistItem> {
    const tokenBlacklistItemDomain = TokenBlacklistItem.create({
      accessToken,
      refreshToken,
    });
    await this._tokenBlacklistItemModel.create(tokenBlacklistItemDomain);
    return tokenBlacklistItemDomain;
  }
}
