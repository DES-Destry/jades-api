import { IUser } from '../../../modules/user/domain/user.interface';

export interface IUserSubscription {
  id?: string;
  subscriberId: string;
  subscriber?: IUser;
  writerId: string;
  writer?: IUser;
  createdAt?: Date;
}
