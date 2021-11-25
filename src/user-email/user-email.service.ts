import { Injectable } from '@nestjs/common';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { UserEmail } from 'src/shared/domain/user-email';
import { CreateUserEmailDto } from './dtos/create-user-email.dto';
import { UserEmailRepository } from './repository/user-email.repository';

@Injectable()
export class UserEmailService {
  constructor(private readonly _userEmailRepository: UserEmailRepository) {}

  public async create(dto: CreateUserEmailDto): Promise<IUserEmail> {
    const domain = UserEmail.create({
      ...dto,
      isVisible: false,
    });

    const userEmail = await this._userEmailRepository.create(domain);
    return userEmail;
  }
}
