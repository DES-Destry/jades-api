import { IUserStrike } from './user-strike.interface';

export interface IUserStrikeAppeal {
  id?: string;
  appealContent: string;
  strike: IUserStrike;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
