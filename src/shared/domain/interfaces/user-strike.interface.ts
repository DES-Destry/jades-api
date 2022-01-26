import { UserStrikeLevel } from '../common/user-strike-level';
import { IUser } from './user.interface';

export interface IUserStrike {
  id?: string;
  userId: string;
  user?: IUser;
  issuerId: string;
  issuer?: IUser;
  level: UserStrikeLevel;
  reason: string;
  expiredAt: Date;
  appealId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
