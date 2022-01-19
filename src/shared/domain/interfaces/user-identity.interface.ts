import { IUser } from './user.interface';

export interface IUserIdentity {
  id?: string;
  userId: string;
  user?: IUser;
  verificationCode: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
