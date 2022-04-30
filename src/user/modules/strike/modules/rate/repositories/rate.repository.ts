import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateType } from 'src/shared/domain/common/rate-type';
import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { UserStrikeRate } from 'src/shared/domain/user-strike-rate';
import { Repository } from 'typeorm';
import { ToggleRateResponseDto } from '../dtos/toggle-rate.dto';
import { IUserStrikeRateRepository } from '../interfaces/rate-repository.interface';
import { UserStrikeRateEntity } from '../rate.entity';

@Injectable()
export class UserStrikeRateRepository implements IUserStrikeRateRepository {
  constructor(
    @InjectRepository(UserStrikeRateEntity)
    private readonly _userStrikeRateEntity: Repository<UserStrikeRateEntity>,
  ) {}

  public async getById(id: string): Promise<IUserStrikeRate> {
    if (!id) {
      return null;
    }

    const entity = await this._userStrikeRateEntity.findOne(id);
    return entity && UserStrikeRate.transform(entity);
  }

  public async toggleLike(userId: string): Promise<ToggleRateResponseDto> {
    if (!userId) {
      return null;
    }

    const entity = await this._userStrikeRateEntity.findOne({
      where: { userId },
    });

    // If user not rated strike earlier
    if (!entity) {
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Like,
      });
      const entity = this._userStrikeRateEntity.create(rateDomain);
      await entity.save();
      return { isRateAdded: true };
    }

    // If user already liked strike - delete this like
    if (entity.rateType === RateType.Like) {
      await this._userStrikeRateEntity.delete(entity);
      return { isRateAdded: false };
    }
    // If user already disliked strike - delete this dislike and like this strike
    if (entity.rateType === RateType.Dislike) {
      await this._userStrikeRateEntity.delete(entity);
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Like,
      });
      const createdEntity = this._userStrikeRateEntity.create(rateDomain);
      await createdEntity.save();
      return { isRateAdded: true };
    }
  }
  public async toggleDislike(userId: string): Promise<ToggleRateResponseDto> {
    if (!userId) {
      return null;
    }

    const entity = await this._userStrikeRateEntity.findOne({
      where: { userId },
    });

    // If user not rated strike earlier
    if (!entity) {
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Dislike,
      });
      const createdEntity = this._userStrikeRateEntity.create(rateDomain);
      await createdEntity.save();
      return { isRateAdded: true };
    }

    // If user already disliked strike - delete this dislike
    if (entity.rateType === RateType.Dislike) {
      await this._userStrikeRateEntity.delete(entity);
      return { isRateAdded: false };
    }
    // If user already liked strike - delete this like and dislike this strike
    if (entity.rateType === RateType.Like) {
      await this._userStrikeRateEntity.delete(entity);
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Dislike,
      });
      const createdEntity = this._userStrikeRateEntity.create(rateDomain);
      await createdEntity.save();
      return { isRateAdded: true };
    }
  }
}
