import { InjectRepository } from '@nestjs/typeorm';
import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';
import { UserSubscription } from 'src/shared/domain/user-subscription';
import { Repository } from 'typeorm';
import { IUserSubscriptionRepository } from '../interfaces/subscription-repository.interface';
import { UserSubscriptionEntity } from '../subscription.entity';

export class UserSubscriptionRepository implements IUserSubscriptionRepository {
  constructor(
    @InjectRepository(UserSubscriptionEntity)
    private readonly _userSubscriptionEntity: Repository<UserSubscriptionEntity>,
  ) {}

  public async getById(id: string): Promise<IUserSubscription> {
    if (!id) {
      return null;
    }

    const model = await this._userSubscriptionEntity.findOne(id);
    return model && UserSubscription.transform(model);
  }
  public async getAllForSubscriber(
    subscriberId: string,
  ): Promise<IUserSubscription[]> {
    if (!subscriberId) {
      return null;
    }

    const models = await this._userSubscriptionEntity.find({
      where: { subscriberId },
    });

    return models.map((model) => UserSubscription.transform(model));
  }
  public async getAllForWriter(writerId: string): Promise<IUserSubscription[]> {
    if (!writerId) {
      return null;
    }

    const models = await this._userSubscriptionEntity.find({
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

    const model = await this._userSubscriptionEntity.findOne({
      where: { subscriberId, writerId },
    });

    if (model) {
      await this._userSubscriptionEntity.delete(model);
      return false;
    }

    const subscriptionDomain = UserSubscription.create({
      subscriberId,
      writerId,
    });
    const createdEntity =
      this._userSubscriptionEntity.create(subscriptionDomain);
    await createdEntity.save();

    return true;
  }
}
