import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { CreateUserEmailRequestDto } from '../dtos/create-user-email.dto';

export interface IUserEmailRepository {
  getById(id: string): Promise<IUserEmail>;

  create(dto: CreateUserEmailRequestDto): Promise<IUserEmail>;

  toggleMain(emailId: string): Promise<void>;
  toggleVisible(emailId: string): Promise<void>;

  // If email is main - not delete and return false
  deleteEmail(emailId: string): Promise<boolean>;
}
