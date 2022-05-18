import { Inject, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { IUser } from 'src/modules/user/domain/user.interface';
import { UserEmailService } from 'src/modules/user/modules/email/infrastructure/email.service';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { User } from '../domain/user.aggregate-root';
import { CreateUserDto } from 'src/shared/dtos (delete)/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
    private readonly _userEmailService: UserEmailService,
  ) {}

  public async getByUsernameOrNull(username: string): Promise<User> {
    const user = await this._userRepository.getByUsername(username);
    return user;
  }

  public async getByEmailOrNull(email: string): Promise<User> {
    const user = await this._userRepository.getByEmail(email);
    return user;
  }

  public async getByLoginOrNull(login: string): Promise<User> {
    const user = await this._userRepository.getByLogin(login);
    return user;
  }

  public async getForPayloadOrNull(payload: UserPayload): Promise<User> {
    const user = await this._userRepository.getForPayload(payload);
    return user;
  }

  public async createUserOrNull(dto: CreateUserDto): Promise<IUser> {
    if (!dto) {
      return null;
    }

    const byUsernameCandidate = await this.getByUsernameOrNull(dto.username);
    const byEmailCandidate = await this.getByEmailOrNull(dto.email);

    if (byUsernameCandidate || byEmailCandidate) {
      return null;
    }

    const user = await this._userRepository.create(dto);
    await this._userEmailService.createUserEmailOrNull(
      {
        email: dto.email,
        isMain: true,
      },
      user,
    );

    return user;
  }
}
