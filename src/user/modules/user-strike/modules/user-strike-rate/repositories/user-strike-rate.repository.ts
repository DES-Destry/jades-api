import { InjectModel } from '@nestjs/sequelize';
import { RateType } from 'src/shared/domain/common/rate-type';
import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { UserStrikeRate } from 'src/shared/domain/user-strike-rate';
import { ToggleRateResponseDto } from '../dtos/toggle-rate.dto';
import { IUserStrikeRateRepository } from '../interfaces/user-strike-rate-repository.interface';
import { UserStrikeRateModel } from '../user-strike-rate.model';

export class UserStrikeRateRepository implements IUserStrikeRateRepository {
  constructor(
    @InjectModel(UserStrikeRateModel)
    private readonly _userStrikeRateModel: typeof UserStrikeRateModel,
  ) {}

  public async getById(id: string): Promise<IUserStrikeRate> {
    if (!id) {
      return null;
    }

    const model = await this._userStrikeRateModel.findByPk(id);
    return model && UserStrikeRate.transform(model);
  }

  public async toggleLike(userId: string): Promise<ToggleRateResponseDto> {
    if (!userId) {
      return null;
    }

    const model = await this._userStrikeRateModel.findOne({
      where: { userId },
    });

    // If user not rated strike earlier
    if (!model) {
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Like,
      });
      await this._userStrikeRateModel.create(rateDomain);
      return { isRateAdded: true };
    }

    // If user already liked strike - delete this like
    if (model.rateType === RateType.Like) {
      await model.destroy();
      return { isRateAdded: false };
    }
    // If user already disliked strike - delete this dislike and like this strike
    if (model.rateType === RateType.Dislike) {
      await model.destroy();
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Like,
      });
      await this._userStrikeRateModel.create(rateDomain);
      return { isRateAdded: true };
    }
  }
  public async toggleDislike(userId: string): Promise<ToggleRateResponseDto> {
    if (!userId) {
      return null;
    }

    const model = await this._userStrikeRateModel.findOne({
      where: { userId },
    });

    // If user not rated strike earlier
    if (!model) {
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Dislike,
      });
      await this._userStrikeRateModel.create(rateDomain);
      return { isRateAdded: true };
    }

    // If user already disliked strike - delete this dislike
    if (model.rateType === RateType.Dislike) {
      await model.destroy();
      return { isRateAdded: false };
    }
    // If user already liked strike - delete this like and dislike this strike
    if (model.rateType === RateType.Like) {
      await model.destroy();
      const rateDomain = UserStrikeRate.create({
        userId,
        rateType: RateType.Dislike,
      });
      await this._userStrikeRateModel.create(rateDomain);
      return { isRateAdded: true };
    }
  }
}
