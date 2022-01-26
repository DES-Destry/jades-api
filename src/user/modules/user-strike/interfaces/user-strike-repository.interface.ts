import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';

export interface IUserStrikeRepository {
  getById(id: string): Promise<IUserStrike>;

  createUserStrike(props: IUserStrike): Promise<IUserStrike>;

  deleteUserStrike(strikeId: string): Promise<boolean>;
}
