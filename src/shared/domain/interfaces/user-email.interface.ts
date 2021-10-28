import { IUser } from './user.interface';

export interface IUserEmail {
  id: string;
  userId: string;
  user?: IUser;
  email: string;
  isMain: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
