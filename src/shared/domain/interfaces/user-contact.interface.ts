import { IUser } from './user.interface';

export interface IUserContact {
  id?: string;
  userId: string;
  user?: IUser;
  title: string;
  description?: string;
  mediaType: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}
