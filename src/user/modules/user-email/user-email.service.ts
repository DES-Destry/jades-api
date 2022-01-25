import { Injectable } from '@nestjs/common';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { UserEmail } from 'src/shared/domain/user-email';
import { CreateUserEmailDto } from './dtos/create-user-email.dto';
import { UserEmailRepository } from './repository/user-email.repository';

@Injectable()
export class UserEmailService {
  constructor(private readonly _userEmailRepository: UserEmailRepository) {}

  public async createUserEmailOrNull(
    dto: CreateUserEmailDto,
  ): Promise<IUserEmail> {
    const userEmail = await this._userEmailRepository.create(dto);
    return userEmail;
  }
}
