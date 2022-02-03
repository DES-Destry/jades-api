import { InjectModel } from '@nestjs/sequelize';
import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';
import { UserSubscription } from 'src/shared/domain/user-subscription';
import { IUserSubscriptionRepository } from '../interfaces/subscription-repository.interface';
import { UserSubscriptionModel } from '../subscription.model';

export class UserSubscriptionRepository implements IUserSubscriptionRepository {
  constructor(
    @InjectModel(UserSubscriptionModel)
    private readonly _userSubscriptionModel: typeof UserSubscriptionModel,
  ) {}

  public async getById(id: string): Promise<IUserSubscription> {
    if (!id) {
      return null;
    }

    const model = await this._userSubscriptionModel.findByPk(id);
    return model && UserSubscription.transform(model);
  }
  public async getAllForSubscriber(
    subscriberId: string,
  ): Promise<IUserSubscription[]> {
    if (!subscriberId) {
      return null;
    }

    const models = await this._userSubscriptionModel.findAll({
      where: { subscriberId },
    });

    return models.map((model) => UserSubscription.transform(model));
  }
  public async getAllForWriter(writerId: string): Promise<IUserSubscription[]> {
    if (!writerId) {
      return null;
    }

    const models = await this._userSubscriptionModel.findAll({
      where: { writerId },
    });

    return models.map((model) => UserSubscription.transform(model));
  }

  public async toggleSubscription(
    subscriberId: string,
    writerId: string,
  ): Promise<boolean> {
    if (!subscriberId || !writerId) {
      return null;
    }

    const model = await this._userSubscriptionModel.findOne({
      where: { subscriberId, writerId },
    });

    if (model) {
      await model.destroy();
      return false;
    }

    const subscriptionDomain = UserSubscription.create({
      subscriberId,
      writerId,
    });
    await this._userSubscriptionModel.create(subscriptionDomain);

    return true;
  }
}
