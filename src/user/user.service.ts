import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { UserEmailService } from 'src/user/modules/email/email.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userEmailService: UserEmailService,
  ) {}

  public async getByUsernameOrNull(username: string): Promise<IUser> {
    const user = await this._userRepository.getByUsername(username);
    return user;
  }

  public async getByEmailOrNull(email: string): Promise<IUser> {
    const user = await this._userRepository.getByEmail(email);
    return user;
  }

  public async getByLoginOrNull(login: string): Promise<IUser> {
    const user = await this._userRepository.getByLogin(login);
    return user;
  }

  public async getForPayloadOrNull(payload: UserPayload): Promise<IUser> {
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
