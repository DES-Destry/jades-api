import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';

export interface IUserSubscriptionRepository {
  getById(id: string): Promise<IUserSubscription>;
  getAllForSubscriber(subscriberId: string): Promise<IUserSubscription[]>;
  getAllForWriter(writerId: string): Promise<IUserSubscription[]>;

  toggleSubscription(subscriberId: string, writerId: string): Promise<boolean>;
}
