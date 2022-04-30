import { InjectRepository } from '@nestjs/typeorm';
import { ITokenBlacklistItem } from 'src/shared/domain/interfaces/token-blacklist-item.interface';
import { TokenBlacklistItem } from 'src/shared/domain/token-blacklist-item';
import { Repository } from 'typeorm';
import { TokenBlacklistItemEntity } from '../entities/token-blacklist-item.entity';
import { ITokenBlacklistRepository } from '../interfaces/token-blacklist-repository.interface';

export class TokenBlacklistRepository implements ITokenBlacklistRepository {
  constructor(
    @InjectRepository(TokenBlacklistItemEntity)
    private readonly _tokenBlacklistItemEntity: Repository<TokenBlacklistItemEntity>,
  ) {}

  public async getById(id: string): Promise<ITokenBlacklistItem> {
    if (!id) {
      return null;
    }

    const entity = await this._tokenBlacklistItemEntity.findOne(id);
    return entity && TokenBlacklistItem.transform(entity);
  }
  public async getByAccessToken(
    accessToken: string,
  ): Promise<ITokenBlacklistItem> {
    if (!accessToken) {
      return null;
    }

    const entity = await this._tokenBlacklistItemEntity.findOne({
      where: { accessToken },
    });
    return entity && TokenBlacklistItem.transform(entity);
  }
  public async getByRefreshToken(
    refreshToken: string,
  ): Promise<ITokenBlacklistItem> {
    if (!refreshToken) {
      return null;
    }

    const entity = await this._tokenBlacklistItemEntity.findOne({
      where: { refreshToken },
    });
    return entity && TokenBlacklistItem.transform(entity);
  }

  public async createBlacklistItem(
    accessToken: string,
    refreshToken: string,
  ): Promise<ITokenBlacklistItem> {
    const tokenBlacklistItemDomain = TokenBlacklistItem.create({
      accessToken,
      refreshToken,
    });
    const createdEntity = this._tokenBlacklistItemEntity.create(
      tokenBlacklistItemDomain,
    );
    await createdEntity.save();
    return tokenBlacklistItemDomain;
  }
}
