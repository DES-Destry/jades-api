import { RateType } from '../common/rate-type';
import { IUser } from '../../../modules/user/domain/user.interface';

export interface IUserStrikeRate {
  id?: string;
  rateType: RateType;
  userId: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
