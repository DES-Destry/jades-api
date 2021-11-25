import { Injectable } from '@nestjs/common';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { UserEmailService } from 'src/user-email/user-email.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userEmailService: UserEmailService,
  ) {}

  public async getByUsername(username: string): Promise<IUser> {
    const user = await this._userRepository.getByUsername(username);
    return user;
  }

  public async getByLogin(login: string): Promise<IUser> {
    const user = await this._userRepository.getByLogin(login);
    return user;
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await this._userRepository.getByEmail(email);
    return user;
  }

  public async createUserOrNull(dto: CreateUserDto): Promise<IUser | null> {
    const byUsernameCandidate = await this.getByUsername(dto.username);
    const byEmailCandidate = await this.getByEmail(dto.email);

    if (byUsernameCandidate || byEmailCandidate) {
      return null;
    }

    const user = await this._userRepository.create(dto);
    await this._userEmailService.create({
      email: dto.email,
      isMain: true,
      userId: user?.id,
    });

    return user;
  }
}
