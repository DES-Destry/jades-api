import { UserPayload } from 'src/shared/domain/common/user.payload';
import { CreateUserDto } from '../../../../shared/dtos (delete)/create-user.dto';
import { User } from '../user.aggregate-root';

export interface IUserRepository {
  getById(userId: string): Promise<User>;
  getByUsername(username: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByLogin(login: string): Promise<User>;
  getForPayload(payload: UserPayload): Promise<User>;

  create(dto: CreateUserDto): Promise<User>;

  updateProfile(user: Partial<User>): Promise<User>;
}
