import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';

export interface IUserRepository {
  getById(userId: string): Promise<IUser>;
  getByUsername(username: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  getByLogin(login: string): Promise<IUser>;

  create(dto: CreateUserDto): Promise<IUser>;

  updateProfile(user: Partial<IUser>): Promise<IUser>;
  verify(userId: string): Promise<void>;
}
